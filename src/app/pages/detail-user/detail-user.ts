import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetUserById } from '../../services/user/get-user-by-id';
import { DeleteUser } from '../../services/user/delete-user';
import { UpdateUser } from '../../services/user/update-user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-user',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './detail-user.html',
  styleUrl: './detail-user.css'
})
export class DetailUser {
  isAdmin = false;
  isSuperAdmin = false;
  user: User | undefined = undefined;
  id_user: number | null = null;
  activeTab: 'info' | 'edit' = 'info';
  errorMessage: string = "";
  profileForm!: FormGroup;
  isSubmitted = false;
  loggedUserId: number | null = null;

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
      username: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.email]],
      role: ["", [Validators.required]]
    });
    this.getUser();
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.isAdmin = true;
      const isSuperAdmin = localStorage.getItem("isSuperAdmin");
      if (isSuperAdmin === "true") {
        this.isSuperAdmin = true;
      }
    }
  }

  deleteUser() {
    if (!this.user || this.id_user === null) {
      Swal.fire({
        title: 'Error',
        text: 'User not loaded or missing ID.',
        icon: 'error',
        customClass: {
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
        },
        buttonsStyling: false
      });
      return;
    }

    Swal.fire({
      title: 'Are you sure?',
      text: `This will permanently delete the user with ID ${this.id_user}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      customClass: {
        confirmButton: 'bg-red-500 hover:bg-red-600 text-white m-2 font-semibold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-gray-800 m-2 font-semibold py-2 px-4 rounded'
      },
      buttonsStyling: false
    }).then((result) => {
      if (result.isConfirmed) {
        this._deleteUserService.execute(this.id_user!).subscribe({
          next: () => {
            Swal.fire({
              title: 'Deleted!',
              text: `User with ID ${this.id_user} deleted successfully.`,
              icon: 'success',
              customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false
            }).then(() => {
              this._router.navigate(["/admin/users"]);
            });
          },
          error: (err) => {
            Swal.fire({
              title: 'Failed',
              text: err?.error?.message || 'Failed to delete user.',
              icon: 'error',
              customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false
            });
          }
        });
      }
    });
  }


  
  goBack() {
    this._router.navigate(["/admin/users"]);
  }
  
  getUser(){
    this.id_user = Number(this._actRoute.snapshot.paramMap.get("id"));
    this.loggedUserId = Number(localStorage.getItem("id_user"));
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
      this.isSubmitted = true;
      return;
    }

    this.updateUser();
  }
  
  updateUser() {
    this.isSubmitted = true;
    Swal.fire({
      title: 'Confirm your Update action.',
      text: "This action cannot be undone.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      customClass: {
        confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white m-2 font-semibold py-2 px-4 rounded',
        cancelButton: 'bg-gray-300 hover:bg-gray-400 text-black m-2 font-semibold py-2 px-4 rounded'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this._updateUserService.execute(this.id_user, this.profileForm.value).subscribe({
          next: () => {
            Swal.fire({
              title: 'Success',
              text: 'User updated successfully.',
              icon: 'success',
              customClass: {
                confirmButton: 'bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false
            }).then(()=>{
              this.profileForm.reset();
              this._router.navigate(["/admin/users"]);
            });
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || 'Update failed.';
            Swal.fire({
              title: 'Error',
              text: this.errorMessage,
              icon: 'error',
              customClass: {
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
              },
              buttonsStyling: false
            });
          }
        });
      }
    });
  }

  canDeleteUser(): boolean {
    if (!this.user || this.loggedUserId === null) return false;

    const targetRole = this.user.role;
    const targetId = this.user.id_user;

    if (this.isSuperAdmin && this.loggedUserId === targetId && targetRole === 'super_admin') {
      return false;
    }

    if (this.isSuperAdmin) {
      return true;
    }

    if (this.isAdmin && targetRole === 'user') {
      return true;
    }

    if(this.isAdmin && !this.isSuperAdmin && targetRole === 'admin'){
      return false;
    }

    if(this.isAdmin && !this.isSuperAdmin && targetRole === 'super_admin'){
      return false;
    }

    return false;
  }
  
  canUpdateUser(): boolean {
    if (!this.user || this.loggedUserId === null) return false;

    const targetRole = this.user.role;

    if (this.isSuperAdmin) {
      return true;
    }

    if (this.isAdmin && targetRole === 'user') {
      return true;
    }

    if(this.isAdmin && !this.isSuperAdmin && targetRole === 'admin'){
      return false;
    }

    if(this.isAdmin && !this.isSuperAdmin && targetRole === 'super_admin'){
      return false;
    }

    return false;
  }

}