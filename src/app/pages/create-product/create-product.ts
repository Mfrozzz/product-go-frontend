import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.productForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      console.log(this.productForm.value);
      this.productForm.reset();
      this.isSubmitted = false;
    }
  }

}
