import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

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

}
