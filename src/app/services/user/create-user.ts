import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CreateUser {
  private PATH = environment.apiUrl;
  private _http = inject(HttpClient);

  constructor() { }
  
  execute(userData: any){
    const url = `${this.PATH}/register`;
    const user = this._http.post<HttpEvent<User>>(url, userData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.Response) {
          console.log('User created successfully:', event.body);
        }
      },
      error: (error) => {
        console.error('Error creating user:', error);
      }
    });
    return user;
  }

}