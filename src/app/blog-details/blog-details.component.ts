import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from './blog-details.service';
import { Blog, BlogResponse } from './blog-details.interface';
import { RelatedBlog, RelatedBlogResponse } from './relatedblog.interface';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | undefined;
  sanitizedContent: SafeHtml | undefined;
  sanitizedTitle: SafeHtml | undefined;
  isLoading = true; // To track loading state
  error: string | null = null; // To track errors
  relatedblogs: RelatedBlog[] = [];
  post_count = 3; // Post count for latest blogs

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) {
        this.getBlogDetail(slug);
        this.getRelatedBlogs(slug, this.post_count);
      } else {
        this.error = 'Invalid blog slug';
        this.isLoading = false;
      }
    });
  }

  getBlogDetail(slug: string): void {
    this.blogService.blogDetail(slug).subscribe(
      (response: BlogResponse) => {
        this.blog = response.data;
        if (this.blog) {
          this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
          this.sanitizedTitle = this.sanitizer.bypassSecurityTrustHtml(this.blog.title);
          this.titleService.setTitle(this.blog.title);
        } else {
          this.error = 'Blog not found';
        }
        this.isLoading = false;
      },
      (error) => {
        this.error = 'An error occurred while fetching the blog details.';
        console.error('Error fetching blog details:', error);
        this.isLoading = false;
      }
    );
  }

  getRelatedBlogs(slug: string, post_count: number): void {
    this.blogService.getRelatedBlogs(slug, post_count).subscribe(
      (response: RelatedBlogResponse) => {
        this.relatedblogs = response.data;
      },
      (error) => {
        this.error = 'An error occurred while fetching the related blogs.';
        console.error('Error fetching related blogs:', error);
        this.isLoading = false;
      }
    );
  }

  viewDetail(slug: string): void {
    this.router.navigate(['/blog', slug]); // Navigate to the detail page
  }
}