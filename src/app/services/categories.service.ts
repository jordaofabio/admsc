import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Category } from '../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  urlDefault = `${environment.API_URL}/category`;

  getCategories() {
    return this.http.get(this.urlDefault);
  }

  getCategory(id: number) {
      return this.http.get(`${this.urlDefault}/${id}`);
  }

  categoryCategory(data: Category) {
    return this.http.post(this.urlDefault, data);
  }

  putCategory(data: Category) {
    return this.http.put(this.urlDefault, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.urlDefault}/${id}`);
  }
}
