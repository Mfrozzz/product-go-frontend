import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import { CreateUser } from '../../services/user/create-user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  formRegister!: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string = "";

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _userService: CreateUser){
    
  }

  ngOnInit(){
    this.formRegister = this._formBuilder.group({
      username: ["",[Validators.required, Validators.maxLength(50)]],
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if (this.formRegister.invalid) return;
    
    console.log(this.formRegister.value);
    this.register();
    this.formRegister.reset();
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }

  async register(){
    this.isSubmitted = true;

    try {
      this._userService.execute(this.formRegister.value);

      this._router.navigate(['/login']);
    } catch(err: any) {
      this.errorMessage = err?.error?.message || 'Register failed.';
    }
  }
  
}
