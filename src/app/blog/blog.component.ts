import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from './blog.service'; // Import the service
import { Blog } from './blog.interface'; // Import the Blog interface
import { LatestBlog } from './latestblog.interface'; // Import the Blog interface



@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {

  blogs: Blog[] = [];
  totalBlogs: number = 0;
  postsPerPage = 12;  // Number of posts per page
  currentPage  = 1;    // Current page number
  post_count   = 3;    // Post count for latest blogs

  latestblogs : LatestBlog[] = [];

  constructor(private blogService: BlogService,  private router: Router) { }

  ngOnInit(): void {

    this.loadBlogs();


    this.blogService.getLatestBlogs(this.post_count).subscribe(response => {
      this.latestblogs = response.data;
      //debugger;
      //console.log(latestblogs);
    });

  }
 
   loadBlogs(): void {
    this.blogService.getBlogs(this.postsPerPage, this.currentPage).subscribe(response => {
      //debugger;
      this.blogs = response.data;
      this.totalBlogs = response.total; 
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadBlogs();
  }


  viewDetail(slug: string): void {
    this.router.navigate(['/blog', slug]); // Navigate to the detail page
  }

}