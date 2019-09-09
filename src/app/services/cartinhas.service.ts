import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartinhasService {

  constructor(private http: HttpClient) { }


  urlDefault = `${environment.API_URL}/product`;

  getCartinhas() {
    return this.http.get(this.urlDefault);
  }

  getCartinha(id: number) {
      return this.http.get(`${this.urlDefault}/${id}`);
  }

  postCartinha(data: FormData) {
    return this.http.post(this.urlDefault, data);
  }

  putCartinha(data: FormData) {
    return this.http.put(this.urlDefault, data);
  }

  deleteCartinha(id: number) {
    return this.http.delete(`${this.urlDefault}/${id}`);
  }
}
