import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-user',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './profile-user.html',
  styleUrl: './profile-user.css'
})
export class ProfileUser {
  profileForm!: FormGroup;
  isSubmitted = false;
  isAdmin = false;
  username = 'Test';
  activeTab: 'info' | 'edit' = 'info';

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this._formBuilder.group({
      username: [this.username, Validators.required],
      email: ['usuario@email.com', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.profileForm.valid) {

      console.log(this.profileForm.value);
    }
  }

}