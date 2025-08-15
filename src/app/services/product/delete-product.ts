import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute(id_product: number): Observable<HttpEvent<Product>> {
    const url = `${this.PATH}/api/admin/products/${id_product}`;
    if (typeof window === 'undefined') { 
      throw new Error("This method cannot be called on the server side.");
    }
    return this._http.delete<HttpEvent<Product>>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}