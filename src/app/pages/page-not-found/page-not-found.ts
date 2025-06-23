import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  isAdmin = false;

  ngOnInit(){
    
  }

  constructor(private _router: Router){

  }

  navigateToRegister() {
    this._router.navigate(["/register"]);
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }

  navigateToHome() {
    this._router.navigate([""]);
  }

}
