import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUserById } from '../../services/user/get-user-by-id';
import { DeleteUser } from '../../services/user/delete-user';
import { UpdateUser } from '../../services/user/update-user';

@Component({
  selector: 'app-detail-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-user.html',
  styleUrl: './detail-user.css'
})
export class DetailUser {
  isAdmin = false;
  user: User | undefined = undefined;
  id_user: number | null = null;
  activeTab: 'info' | 'edit' = 'info';
  errorMessage: string = "";
  profileForm!: FormGroup;
  isSubmitted = false;

  constructor(
    private _router: Router,
    private _actRoute: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _showUserService: GetUserById,
    private _cdr: ChangeDetectorRef,
    private _deleteUserService: DeleteUser,
    private _updateUserService: UpdateUser
  ) { }

  ngOnInit(){
    this.profileForm = this._formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      role: ["", Validators.required]
    });
    this.getUser();
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.isAdmin = true;
    }
  }

  deleteUser() {
    if (!this.user || this.id_user === null) {
      alert('User not loaded or missing ID.');
      return;
    }
    if (confirm("Are you sure you want to delete this user?")) {
      this._deleteUserService.execute(this.id_user).subscribe({
        next: () => {
          this._router.navigate(["/admin/users"]);
        },
        error: (err) => {
          alert('Failed to delete user.');
        }
      });
      alert(`User with ID ${this.id_user} deleted successfully.`);
    }
  }

  
  goBack() {
    this._router.navigate(["/admin/users"]);
  }
  
  getUser(){
    this.id_user = Number(this._actRoute.snapshot.paramMap.get("id"));
    this._showUserService.execute(this.id_user).subscribe((user: User) => {
      this.user = user;
      this.profileForm.patchValue({
        username: user.username,
        email: user.email,
        role: user.role
      });
      this._cdr.detectChanges();
    });
  }
  
  onSubmit(){
    if(!this.profileForm.valid) {
      this.errorMessage = "Please fill in all required fields.";
      return;
    }
    this.isSubmitted = true;
    this.updateUser();
  }
  
  updateUser() {
    try {
      this._updateUserService.execute(this.id_user, this.profileForm.value).subscribe({
        next: () => {
          this._router.navigate(["/admin/users"]);
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'Update failed.';
        }
      });
      this._router.navigate(["/admin/users"]);
    } catch (err: any) {
      this.errorMessage = err?.error?.message || 'Update Product failed.';
    }
  }
  
}
