import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowProduct {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute(id_product: number):Observable<any>{
    const url = `${this.PATH}/api/products/${id_product}`;
    if (typeof window === 'undefined') { 
      throw new Error("This method cannot be called on the server side.");
    }
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}