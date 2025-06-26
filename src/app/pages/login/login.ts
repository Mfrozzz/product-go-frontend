import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/user/login';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  formLogin!: FormGroup;
  isSubmitted: boolean = false;
  errorMessage: string = "";
  userToken: string = "";

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _userService: LoginService){
    
  }

  ngOnInit(){
    this.formLogin = this._formBuilder.group({
      email: ["",[Validators.required, Validators.email]],
      password: ["",[Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(){
    if (this.formLogin.invalid) return;

    this.login();
    this.formLogin.reset();
  }

  async login(){
    this.isSubmitted = true;

    this._userService.execute(this.formLogin.value).subscribe({
      next: (response) => {
        this.userToken = response.token;
        localStorage.setItem("token", this.userToken);
        this._router.navigate(['/products']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Register failed.';
      }
    });
  }

  navigateToRegister() {
    this._router.navigate(["/register"]);
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }
}
