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
  postsPerPage = 12;  // Number of posts per page
  currentPage = 1;    // Current page number

  post_count = 3;    // Post count for latest blogs

  latestblogs : LatestBlog[] = [];

  constructor(private blogService: BlogService,  private router: Router) { }

  ngOnInit(): void {

    this.blogService.getBlogs(this.postsPerPage, this.currentPage).subscribe(response => {
      this.blogs = response.data; // Use 'data' if the response contains it
    });


    this.blogService.getLatestBlogs(this.post_count).subscribe(response => {
      this.latestblogs = response.data;;
      //debugger;
      //console.log(latestblogs);
    });

  }

  viewDetail(blogId: number): void {
    this.router.navigate(['/blog', blogId]); // Navigate to the detail page
  }

}