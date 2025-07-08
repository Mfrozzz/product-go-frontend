import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { GetUserById } from '../../services/user/get-user-by-id';
import { UpdateUser } from '../../services/user/update-user';

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
  user: User | undefined = undefined;
  id_user: number | null = null;
  activeTab: 'info' | 'edit' = 'info';
  errorMessage: string = "";

  constructor(private _formBuilder: FormBuilder, private _router: Router, private _actRoute: ActivatedRoute, private _cdr: ChangeDetectorRef, private _getUserByIdService: GetUserById, private _updateUserService: UpdateUser) { }

  ngOnInit() {
    this.profileForm = this._formBuilder.group({
      username: ["", Validators.required],
      email: ['usuario@email.com', [Validators.required, Validators.email]],
      password: ["", [Validators.minLength(6)]]
    });
    this.getUser();
  }

  getUser(){
    this.id_user = Number(this._actRoute.snapshot.paramMap.get("id"));
    this._getUserByIdService.execute(this.id_user).subscribe((user: User) => {
      this.user = user;
      this.profileForm.patchValue({
        username: user.username,
        email: user.email
      });
      this._cdr.detectChanges();
    });
  }

  onSubmit() {
    if (this.profileForm.valid || !this.user) return;
    this.updateProfile();
    this.profileForm.reset();
  }

  updateProfile(){
    this.isSubmitted = true;

    try {
      this._updateUserService.execute(this.id_user, this.profileForm.value); // there is something wrong
      this._router.navigate(["/products"]);
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Update Product failed.';
    }
  }

}