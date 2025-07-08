import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class GetUserById {

  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }

  execute(id_user: any): Observable<any>{
    const url = `${this.PATH}/api/users/${id_user}`;
    if (typeof window === 'undefined') {
      return throwError(() => new Error('localStorage not available'));
    }
    return this._http.get<User>(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
  }
}
