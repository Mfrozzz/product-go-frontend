import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListUsers {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute(): Observable<any> {
    const url = `${this.PATH}/api/admin/users`;
    return this._http.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}
