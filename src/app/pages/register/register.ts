import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formRegister!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private _router: Router, private _formBuilder: FormBuilder){
    
  }

  ngOnInit(){
    this.formRegister = this._formBuilder.group({
      username: ["",[Validators.required, Validators.maxLength(50)]],
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    console.log(this.formRegister.value);
    this.formRegister.reset();
  }

  navigateToRegister() {
    this._router.navigate(["/register"]);
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }
  
}
