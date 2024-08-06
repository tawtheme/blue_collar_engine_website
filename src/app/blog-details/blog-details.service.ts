import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogResponse } from './blog-details.interface';
import { RelatedBlog, RelatedBlogResponse } from './relatedblog.interface';


@Injectable({
 providedIn: 'root',
})

export class BlogService {
 private baseUrl = 'http://bluecollarengine.com/blog/wp-json/api/v1';

constructor(private http: HttpClient) {}

  blogDetail(id: number): Observable<BlogResponse> {
    const body = { id };
    return this.http.post<BlogResponse>(`${this.baseUrl}/blog-detail`, body);
  }

  getRelatedBlogs(post_id: number, post_count: number): Observable<RelatedBlogResponse> {
    const body = { post_id, post_count };
    return this.http.post<RelatedBlogResponse>(`${this.baseUrl}/related-blog-list`, body);
  }



}