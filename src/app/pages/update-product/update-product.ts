import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';

@Component({
  selector: 'app-update-product',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-product.html',
  styleUrl: './update-product.css'
})
export class UpdateProduct {
  productForm!: FormGroup;
  isSubmitted = false;
  isAdmin = false;
  product?: Product = undefined;
  id_product!: number;

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _actRoute: ActivatedRoute, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.id_product = Number(this._actRoute.snapshot.paramMap.get("id"));
    this.productForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(100)]], // + logic to get older values
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