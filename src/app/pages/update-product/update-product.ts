import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ShowProduct } from '../../services/product/show-product';
import { UpdateProductService } from '../../services/product/update-product';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct {
  productForm!: FormGroup;
  isSubmitted = false;
  product?: Product;
  id_product!: number;
  errorMessage: string = "";

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _actRoute: ActivatedRoute, private _cdr: ChangeDetectorRef, private _showProductService: ShowProduct, private _updateProductService: UpdateProductService) { }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: ['', [Validators.maxLength(100)]],
      price: [null, [Validators.min(0)]]
    });
    this.getProduct();
  }

  onSubmit() {
    if (this.productForm.invalid || !this.product) return;
    this.updateProduct();
    this.productForm.reset();
  }

  updateProduct() {
    this.isSubmitted = true;
    if (!this.product) return;

    try {
      this._updateProductService.execute(this.id_product, this.productForm.value);
      this._router.navigate(["/products"]);
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Update Product failed.';
    }
  }

  getProduct() {
    this.id_product = Number(this._actRoute.snapshot.paramMap.get("id"));
    this._showProductService.execute(this.id_product).subscribe((product: Product) => {
      this.product = product;
      this.productForm.patchValue({
        name: product.name,
        price: product.price
      });
      this._cdr.detectChanges();
    });
  }

}