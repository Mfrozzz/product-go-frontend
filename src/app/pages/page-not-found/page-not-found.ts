import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  imports: [],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.css'
})
export class PageNotFound {

  ngOnInit(){
    
  }

  constructor(private _router: Router){

  }

  navigateToHome() {
    this._router.navigate([""]);
  }

}
