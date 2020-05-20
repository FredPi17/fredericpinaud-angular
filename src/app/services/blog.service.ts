import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogKeywords, Posts } from '../models/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  apiUrlBlogKeywords: string = 'http://localhost:3000/admin/blogKeywords/';
  apiUrlBlog: string = 'http://localhost:3000/admin/blog/';

  constructor(private http: HttpClient) { }

  getKeywords(): Observable<HttpResponse<BlogKeywords[]>> {
    return this.http.get<BlogKeywords[]>(this.apiUrlBlogKeywords, {observe: 'response'});
  }

  postNewKeyword(nom): Observable<HttpResponse<BlogKeywords>> {
    return this.http.post<BlogKeywords>(this.apiUrlBlogKeywords, {name: nom}, {observe: 'response'});
  }

  updateKeyword(nom, id): Observable<HttpResponse<BlogKeywords>> {
    return this.http.put<BlogKeywords>(this.apiUrlBlogKeywords + id, {name: nom}, {observe: 'response'});
  }

  getPosts(): Observable<HttpResponse<Posts[]>> {
    return this.http.get<Posts[]>(this.apiUrlBlog, {observe: 'response'});
  }

  newPost(titr, cont, cat, keys): Observable<HttpResponse<Posts>> {
    return this.http.post<Posts>(this.apiUrlBlog, {titre: titr, contenu: cont, categorie: cat, keywords: keys}, {observe: 'response'});
  }

  updatePostById(titr, cont, cat, keys, update, id): Observable<HttpResponse<Posts>> {
    return this.http.post<Posts>(this.apiUrlBlog + id, {titre: titr, contenu: cont, categorie: cat, keywords: keys, update_date: update}, {observe: 'response'});
  }

  deletePostById(id): Observable<HttpResponse<Posts>> {
    return this.http.delete<Posts>(this.apiUrlBlog + id, {observe: 'response'});
  }
}
