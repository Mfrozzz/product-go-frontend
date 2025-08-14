import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/user/login';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _userService: LoginService) {

  }

  ngOnInit() {
    this.formLogin = this._formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.formLogin.invalid) {
      this.isSubmitted = true;
      return;
    }

    this.login();
  }

  async login() {
    this.isSubmitted = true;

    this._userService.execute(this.formLogin.value).subscribe({
      next: (response) => {
        this.userToken = response.token;
        if(this.userToken){
          localStorage.setItem("token", this.userToken);
          Swal.fire({
            title: 'Login Successful',
            text: 'Welcome back!',
            icon: 'success',
            customClass: {
              confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
            },
            buttonsStyling: false,
            confirmButtonText: 'OK'
          }).then(()=>{
            this.formLogin.reset();
            this._router.navigate(['/p/products']);
          });
        } else {
          Swal.fire({
            title: 'Login Failed',
            text: 'User not found or invalid credentials.',
            icon: 'error',
            customClass: {
              confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
            },
            buttonsStyling: false,
            confirmButtonText: 'OK'
          });
        }
      },
      error: (err) => {
        Swal.fire({
          title: 'Login Failed',
          text: err?.error?.message || 'Invalid credentials.',
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

  navigateToRegister() {
    this._router.navigate(["/register"]);
  }

  navigateToHome() {
    this._router.navigate(["/"]);
  }

}