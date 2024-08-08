import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog, BlogResponse } from './blog.interface';
import { LatestBlog, LatestBlogResponse } from './latestblog.interface';


@Injectable({
 providedIn: 'root',
})

export class BlogService {
 private baseUrl = 'http://bluecollarengine.com/blog/wp-json/api/v1';

constructor(private http: HttpClient) {}

  getBlogs(per_page: number, page: number): Observable<BlogResponse> {
    const body = { per_page, page };
    return this.http.post<BlogResponse>(`${this.baseUrl}/blog-list`, body);
  }

  getLatestBlogs(post_count: number): Observable<LatestBlogResponse> {
    const body = { post_count };
    return this.http.post<LatestBlogResponse>(`${this.baseUrl}/latest-blog-list`, body);
  }

  


}