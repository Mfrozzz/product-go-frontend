import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProductService } from '../../services/product/create-product';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { sanitizeInput } from '../../shared/utils/sanitize';

@Component({
  selector: 'app-create-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-product.html',
  styleUrl: './create-product.css'
})
export class CreateProduct {
  productForm!: FormGroup;
  isSubmitted = false;
  isAdmin = false;
  errorMessage: string = "";

  constructor(private _formBuilder: FormBuilder, private _productService: CreateProductService, private _router: Router) { }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    if (this.productForm.invalid){
      this.isSubmitted = true;
      return;
    }

    this.createProduct();
  }

  async createProduct(){
    this.isSubmitted = true;

    const sanitizedProduct = {
      name: sanitizeInput(this.productForm.value.name),
      price: this.productForm.value.price
    };

    this._productService.execute(sanitizedProduct)?.subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Product Created Successfully',
          text: 'Your product has been created.',
          icon: 'success',
          customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
          },
          buttonsStyling: false,
          confirmButtonText: 'OK'
        }).then(()=>{
          this.productForm.reset();
          this._router.navigate(['/products']);
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Product Creation Failed',
          text: err?.error?.message || 'Create Product failed. Please try again.',
          icon: 'error',
          customClass: {
            confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
          },
          buttonsStyling: false,
          confirmButtonText: 'OK'
        });
      }
    });
  }

}