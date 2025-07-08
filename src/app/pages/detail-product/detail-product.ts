import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShowProduct } from '../../services/product/show-product';
import { Product } from '../../models/product';
import { DeleteProductService } from '../../services/product/delete-product';

@Component({
  selector: 'app-detail-product',
  imports: [CommonModule],
  templateUrl: './detail-product.html',
  styleUrl: './detail-product.css'
})

export class DetailProduct {
  isAdmin = false;
  product: Product | undefined = undefined;
  id_product: number | null = null;

  constructor(
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _showProductService: ShowProduct,
    private _cdr: ChangeDetectorRef,
    private _deleteProductService: DeleteProductService
  ) { }

  ngOnInit() {
    const param = this._actRoute.snapshot.paramMap.get("id");
    this.id_product = param ? Number(param) : null;
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.isAdmin = true;
    }
    if (this.id_product !== null) {
      this._showProductService.execute(this.id_product).subscribe((product: Product) => {
        this.product = product;
        this._cdr.detectChanges();
      });
    }
  }

  goBack() {
    this._router.navigate(["/products"]);
  }

  editProduct() {
    if (this.id_product !== null) {
      this._router.navigate([`/products/update/${this.id_product}`]);
    }
  }

  deleteProduct() {
    if (!this.product || this.id_product === null) {
      alert('Product not loaded or missing ID.');
      return;
    }
    this._deleteProductService.execute(this.id_product).subscribe({
      next: () => {
        this._router.navigate(["/products"]);
      },
      error: (err) => {
        console.error('Error deleting product:', err);
        alert('Failed to delete product.');
      }
    });
  }
}