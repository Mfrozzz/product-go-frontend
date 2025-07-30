import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CreateUser } from '../../services/user/create-user';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

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

    this._userService.execute(this.formRegister.value).subscribe({
      next: (res) => {
        this.formRegister.reset();
        this._router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Register failed.';
      }
    });
  }

}