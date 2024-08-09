import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogResponse } from './blog-details.interface';
import { RelatedBlog, RelatedBlogResponse } from './relatedblog.interface';
import { environment } from '@environments/environment';


@Injectable({
 providedIn: 'root',
})

export class BlogService {
  baseUrl: any = environment.blogBaseUrl;
constructor(private http: HttpClient) {}

  blogDetail(slug: string): Observable<BlogResponse> {
    const body = { slug };
    return this.http.post<BlogResponse>(`${this.baseUrl}/blog-detail`, body);
  }

  getRelatedBlogs(slug: string, post_count: number): Observable<RelatedBlogResponse> {
    const body = { slug, post_count };
    return this.http.post<RelatedBlogResponse>(`${this.baseUrl}/related-blog-list`, body);
  }



}