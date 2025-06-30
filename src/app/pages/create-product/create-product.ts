import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProductService } from '../../services/product/create-product';
import { Router } from '@angular/router';

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
    if (this.productForm.invalid) return;

    this.createProduct();
    this.productForm.reset();
  }

  async createProduct(){
    this.isSubmitted = true;
    try{
      this._productService.execute(this.productForm.value);
      this._router.navigate(["/products"]);
    } catch(err: any) {
      this.errorMessage = err?.error?.message || 'Create Product failed.';
    }
  }

}