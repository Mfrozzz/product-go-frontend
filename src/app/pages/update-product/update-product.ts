import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ShowProduct } from '../../services/product/show-product';
import { UpdateProductService } from '../../services/product/update-product';
import Swal from 'sweetalert2';
import { sanitizeInput } from '../../shared/utils/sanitize';

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
    const payload = this.productForm.value;
    Swal.fire({
      title: 'Update Product',
      text: 'Are you sure you want to update this product?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white m-2 font-semibold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black m-2 font-semibold py-2 px-4 rounded'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        const sanitizedPayload = {
          name: sanitizeInput(payload.name),
          price: payload.price
        }
        this._updateProductService.execute(this.id_product, sanitizedPayload)?.subscribe({
          next: (res) => {
            Swal.fire({
              title: 'Success',
              text: 'Product updated successfully.',
              icon: 'success',
              customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false
            }).then(()=>{
              this.productForm.reset();
              this._router.navigate(['/products']);
            });
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || 'Update Product failed.';
            Swal.fire({
              title: 'Error',
              text: this.errorMessage,
              icon: 'error',
              customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false
            });
          }
        });
      }
    });
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