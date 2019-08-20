import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http: HttpClient) { }

  urlDefault = `${environment.API_URL}/post`;

  getPosts() {
    return this.http.get(this.urlDefault);
  }

  getPost(id: number) {
      return this.http.get(`${this.urlDefault}/${id}`);
  }

  postPost(data: Post) {
    return this.http.post(this.urlDefault, data);
  }

  putPost(data: Post) {
    return this.http.put(this.urlDefault, data);
  }

  deletePost(id: number) {
    return this.http.delete(`${this.urlDefault}/${id}`);
  }
}
