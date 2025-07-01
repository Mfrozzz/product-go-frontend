import { HttpClient, HttpEvent } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root'
})
export class DeleteProductService {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute(id_product: any) {
    const url = `${this.PATH}/api/admin/products/${id_product}`;
    if (typeof window === 'undefined') { return; }
    return this._http.delete<HttpEvent<Product>>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}
