import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class CreateUser {
  // private PATH = environment.apiUrl;
  private PATH = "http://localhost:8000";
  private _http = inject(HttpClient);

  constructor() { }
  
  execute(userData: any){
    console.log(userData);
    this._http.post<User>(`${this.PATH}/register`,userData).subscribe(user => {
      console.log(user);
      return user;
    });

  }

}