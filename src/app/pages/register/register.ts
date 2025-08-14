import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CreateUser } from '../../services/user/create-user';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { sanitizeInput } from '../../shared/utils/sanitize';

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

  constructor(private _router: Router, private _formBuilder: FormBuilder, private _userService: CreateUser) {

  }

  ngOnInit() {
    this.formRegister = this._formBuilder.group({
      username: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.formRegister.invalid) {
      this.isSubmitted = true;
      return;
    }

    this.register();
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }

  navigateToHome() {
    this._router.navigate(["/"]);
  }

  register() {
    this.isSubmitted = true;

    const sanitizedUser = {
      username: sanitizeInput(this.formRegister.value.username),
      email: this.formRegister.value.email,
      password: this.formRegister.value.password
    };

    this._userService.execute(sanitizedUser).subscribe({
      next: (res) => {
        Swal.fire({
          title: 'Registration Successful',
          text: 'You can now log in.',
          icon: 'success',
          customClass: {
            confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
          },
          buttonsStyling: false,
          confirmButtonText: 'OK'
        }).then(() => {
          this.formRegister.reset();
          this.navigateToLogin();
        });
      },
      error: (err) => {
        Swal.fire({
          title: 'Registration Failed',
          text: err?.error?.message || 'An error occurred during registration.',
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