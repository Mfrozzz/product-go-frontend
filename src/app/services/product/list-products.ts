import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListProducts {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute():Observable<any>{
    const url = `${this.PATH}/api/products`;
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