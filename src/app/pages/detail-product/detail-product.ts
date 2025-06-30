import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowProduct } from '../../services/product/show-product';
import { Product } from '../../models/product';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css'
})

export class DetailProduct {
  isSubmitted = false;
  isAdmin = false;
  product?: Product = undefined;
  id_product!: number;

  constructor(private _router: Router, private _actRoute: ActivatedRoute, private _showProductService: ShowProduct, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.id_product = Number(this._actRoute.snapshot.paramMap.get("id"));
    this._showProductService.execute(this.id_product).subscribe((product: Product)=>{
      this.product = product;
      this._cdr.detectChanges();
    });
  }

  goBack(){
    this._router.navigate(["/products"]);
  }

  editProduct(){
    this._router.navigate([`/products/update/${this.id_product}`]);
  }

  deleteProduct(){

  }
}