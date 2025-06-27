import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { GetUser } from '../../services/user/get-user';
import { ListProducts } from '../../services/product/list-products';
import { Product } from '../../models/product';

@Component({
  selector: 'app-list-product',
  imports: [CommonModule, FormsModule],
  templateUrl: './list-product.html',
  styleUrl: './list-product.css'
})
export class ListProduct {
  showDropdown = false;
  isAdmin = false;
  user?: User;
  products: Product[] = [];

  search = '';
  page = 1;
  perPage = 10;

  constructor(private _router: Router, private _getUserService: GetUser, private _listProductsService: ListProducts, private _cdr: ChangeDetectorRef){ }

  ngOnInit(){
    if (typeof window === 'undefined') {return}
    const token = localStorage.getItem("token");
    if(!token){
      this._router.navigate(["/login"]);
      return;
    }

    this.listProducts();
  }

  listProducts(){
    this._listProductsService.execute().subscribe({
      next: (response) => {
        console.log(response)
        this.products = response || [];
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
      complete: () => {
        this._cdr.detectChanges();
      }
    });
  }

  get filteredProducts() {
    return (this.products ?? []).filter(p =>
      typeof p.name === 'string' && p.name.toLowerCase().includes(this.search.toLowerCase())
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

}