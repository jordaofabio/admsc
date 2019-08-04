import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  urlDefault = `${environment.API_URL}/user`;

  getUsers() {
    return this.http.get(this.urlDefault);
  }

  getUser(id: number) {
    return this.http.get(`${this.urlDefault}/${id}`);
  }

  postUser(data: FormData) {
    return this.http.post(this.urlDefault, data);
  }

  putUser(data: FormData) {
    return this.http.put(this.urlDefault, data);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.urlDefault}/${id}`);
  }
}
