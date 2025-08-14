import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Footer } from '../../shared/layouts/footer/footer';
import { Navbar } from '../../shared/layouts/navbar/navbar';

@Component({
  selector: 'app-page-not-found',
  imports: [CommonModule, Navbar, Footer],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {
  isLogged: boolean = false;

  ngOnInit(){
    if (typeof window === 'undefined') {return}
    const token = localStorage.getItem("token");

    if (!token) {
      this.isLogged = false;
      return;
    } else {
      this.isLogged = true;
    }
    
  }

  constructor(private _router: Router){

  }

  navigateToHome() {
    this._router.navigate([""]);
  }

  navigateToListPage() {
    this._router.navigate(["/p/products"]);
  }

}