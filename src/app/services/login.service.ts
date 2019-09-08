import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  setLogin(login: string, password: string) {
    const url = `${environment.API_URL}/auth`;
    const data = {
      login,
      password
    };
    return this.http.post(url, data);
  }
}
