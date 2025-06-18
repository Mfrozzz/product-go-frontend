import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formLogin!: FormGroup;
  isSubmitted: boolean = false;

  constructor(private _router: Router, private _formBuilder: FormBuilder){
    
  }

  ngOnInit(){
    this.formLogin = this._formBuilder.group({
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    this.isSubmitted = true;
    console.log(this.formLogin.value);
    this.formLogin.reset();
  }

  navigateToRegister() {
    this._router.navigate(["/register"]);
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }
}
