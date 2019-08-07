import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Page } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private http: HttpClient) { }

  urlDefault = `${environment.API_URL}/page`;

  getPages() {
    return this.http.get(this.urlDefault);
  }

  getPage(id: number) {
      return this.http.get(`${this.urlDefault}/${id}`);
  }

  postPage(data: Page) {
    debugger
    return this.http.post(this.urlDefault, data);
  }

  putPage(data: Page) {
    return this.http.put(this.urlDefault, data);
  }

  deletePage(id: number) {
    return this.http.delete(`${this.urlDefault}/${id}`);
  }
}
