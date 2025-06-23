import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css'
})

export class DetailProduct {
  isSubmitted = false;
  islogged = true;
  isAdmin = false;
  showDropdown = false;
  username = 'Test';
  product = {
    name: "test",
    price: 1.2
  };
  id_test = 2;

  constructor(private _router: Router) { }

  ngOnInit() {

  }

  goBack(){
    this._router.navigate(["/products"]);
  }

  editProduct(){
    this._router.navigate([`/products/update/${this.id_test}`]);
  }

  deleteProduct(){

  }

  logout() {
    console.log("logout")
  }
}
