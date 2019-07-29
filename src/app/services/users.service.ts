import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers() {
    const url = `${environment.API_URL}/user`;
    return this.http.get(url);
  }

  postUser(data: any) {

    const url = `${environment.API_URL}/user`;
    return this.http.post(url, data);
  }
}
