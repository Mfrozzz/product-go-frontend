import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css'
})

export class DetailProduct {
  isSubmitted = false;
  islogged = true;
  isAdmin = true;
  showDropdown = false;
  username = 'Test';
  product = {
    name: "test",
    price: 1.2
  };

  constructor() { }

  ngOnInit() {

  }

  goBack(){

  }

  editProduct(){

  }

  deleteProduct(){

  }

  logout() {
    console.log("logout")
  }
}
