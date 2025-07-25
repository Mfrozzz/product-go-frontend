import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UpdateUser {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute(id_user: any, userData: any) {
    const url = `${this.PATH}/api/users/${id_user}`;
    const user = this._http.put<HttpEvent<User>>(url, userData, {
      reportProgress: true,
      observe: "response",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return user;
  }

}