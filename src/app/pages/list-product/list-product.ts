import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GetUser } from '../../services/user/get-user';

@Component({
  selector: 'app-list-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css'
})
export class ListProduct {
  username = 'Test';
  showDropdown = false;
  isAdmin = false;
  user?: User;

  products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
    { id: 3, name: 'Product 3' },
    { id: 4, name: 'Product 4' },
    { id: 5, name: 'Product 5' },
    { id: 6, name: 'Product 6' },
    { id: 7, name: 'Product 7' },
    { id: 8, name: 'Product 8' },
    { id: 9, name: 'Product 9' },
    { id: 10, name: 'Product 10' },
    { id: 11, name: 'Product 11' },
    { id: 12, name: 'Product 12' }
  ];

  search = '';
  page = 1;
  perPage = 10;

  ngOnInit(){
    const token = localStorage.getItem("token");
      if(!token){
        this._router.navigate(["/login"]);
      }
    this._getUserService.execute(token).subscribe((user: User) => {
      this.user = user;
    });

    // get products

  }

  constructor(private _router: Router, private _getUserService: GetUser){ }

  get filteredProducts() {
    return this.products.filter(p =>
      p.name.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredProducts.length / this.perPage));
  }

  get paginatedProducts() {
    const start = (this.page - 1) * this.perPage;
    return this.filteredProducts.slice(start, start + this.perPage);
  }

  goToDetails(id_product: number){
    this._router.navigate([`/products/${id_product}`]);
  }

  goToCreateProduct(){
    this._router.navigate(["products/create"]);
  }

  onSearchChange() {
    this.page = 1;
  }

  onPerPageChange() {
    this.page = 1;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  logout() {

  }

}