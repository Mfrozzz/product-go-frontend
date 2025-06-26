import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }
  
  execute(userData: any): Observable<{ Message: string, token: string }> {
    const url = `${this.PATH}/login`;
    return this._http.post<{ Message: string, token: string }>(url, userData);
  }
}
