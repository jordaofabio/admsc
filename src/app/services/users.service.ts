import { Injectable, EventEmitter } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import * as jwtDecode from 'jwt-decode';
import { ActiveUser } from '../models/activeUser.models';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  static isLogin: EventEmitter<boolean> = new EventEmitter();


  static userUndefined: ActiveUser = {
      id: 0,
      name: '',
      email: '',
      access: 99
  };

  static activeUser: ActiveUser = sessionStorage.getItem('scToken') ?
                    jwtDecode(sessionStorage.getItem('scToken')) :
                    UsersService.userUndefined;


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
