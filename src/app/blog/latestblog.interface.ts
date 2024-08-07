export interface LatestBlog {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  thumbnail: string;
  permalink: string;
  // other properties...
}

export interface LatestBlogResponse {
  data: LatestBlog[];
}