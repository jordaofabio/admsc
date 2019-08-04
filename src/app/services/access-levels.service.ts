import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelsService {

  constructor(private http: HttpClient) { }

  urlDefault = `${environment.API_URL}/access-level`;

  getLevels() {
    return this.http.get(this.urlDefault);
  }

  postLevel(data: FormData) {
    return this.http.post(this.urlDefault, data);
  }

  putLevel(data: FormData) {
    return this.http.put(this.urlDefault, data);
  }
}
