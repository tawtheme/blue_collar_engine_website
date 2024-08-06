import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BlogService } from './blog-details.service';
import { Blog, BlogResponse } from './blog-details.interface';
import { RelatedBlog, RelatedBlogResponse } from './relatedblog.interface';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.scss']
})
export class BlogDetailsComponent implements OnInit {
  blog: Blog | undefined;
  sanitizedContent: SafeHtml | undefined;
  isLoading = true; // To track loading state
  error: string | null = null; // To track errors
  relatedblogs : RelatedBlog[] = [];
  post_count = 3;    // Post count for latest blogs

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = +params.get('id')!;
      if (id) {
        this.getBlogDetail(id);
        this.getRelatedBlogs(id, this.post_count);
      } else {
        this.error = 'Invalid blog ID';
        this.isLoading = false;
      }
    });

  }

  getBlogDetail(id: number): void {
    this.blogService.blogDetail(id).subscribe(
      (response: BlogResponse) => {
         //debugger
        this.blog = response.data; 
        this.sanitizedContent = this.sanitizer.bypassSecurityTrustHtml(this.blog.content);
        this.isLoading = false;
      },
      (error) => {
        this.error = 'An error occurred while fetching the blog details.';
        console.error('Error fetching blog details:', error);
        this.isLoading = false;
      }
    );
  }


  getRelatedBlogs(id: number, post_count: number): void {
    this.blogService.getRelatedBlogs(id, post_count).subscribe(
      (response: RelatedBlogResponse) => {
        this.relatedblogs = response.data; 
      },
      (error) => {
        this.error = 'An error occurred while fetching the related blog.';
        console.error('Error fetching related blog:', error);
        this.isLoading = false;
      }
    );
  }

   viewDetail(blogId: number): void {
    this.router.navigate(['/blog', blogId]); // Navigate to the detail page
  }

}
