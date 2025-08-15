import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../../models/user';
import { CommonModule } from '@angular/common';
import { GetUser } from '../../../services/user/get-user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  showDropdown = false;
  isAdmin = false;
  user?: User;
  isLogged: boolean = false;

  constructor(private _router: Router, private _getUserService: GetUser, private _cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    if (typeof window === 'undefined') { return }
    const token = localStorage.getItem("token");

    if (!token) {
      this.isLogged = false;
      return;
    }

    this._getUserService.execute(token).subscribe((user: User) => {
      this.user = user;
      localStorage.setItem("id_user", user.id_user?.toString() || "");
      this.isLogged = true;
      if (this.user.role === "admin" || this.user.role === "super_admin") {
        localStorage.setItem("isAdmin", "true");
        if(user.role === "super_admin"){
          localStorage.setItem("isSuperAdmin", "true");
        }
        this.isAdmin = true;
      }
      this._cdr.detectChanges();
    });
  }

  navigateToRegister() {
    this._router.navigate(["/register"]);
  }

  navigateToLogin() {
    this._router.navigate(["/login"]);
  }

  navigateToHome() {
    if(!this.isLogged){
      this._router.navigate(["/"]);
    }else {
      this._router.navigate(["/p/products"]);
    }
  }

  navigateToProfile(){
    if (!this.user) {
      Swal.fire({
        icon: 'error',
        title: 'User Not Loaded',
        text: 'Please log in to access your profile.',
        customClass: {
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
        },
        confirmButtonText: 'OK',
        buttonsStyling: false,
      });
      return;
    }
    this._router.navigate([`/p/user/${this.user.id_user}/profile`]);
  }

  navigateToManageUsers(){
    if (!this.isAdmin) {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to manage users.',
        customClass: {
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
        },
        confirmButtonText: 'OK',
        buttonsStyling: false,
      });
      return;
    }
    this._router.navigate(["/p/admin/users"]);
  }

  logout() {
    if (typeof window === 'undefined') { 
      return;
    }
    localStorage.removeItem('token');
    this.isLogged = false;
    if(this.isAdmin){
      this.isAdmin = false;
      localStorage.removeItem('isAdmin');
      if(localStorage.getItem('isSuperAdmin')){
        localStorage.removeItem('isSuperAdmin');
      }
    }
    this.user = undefined;
    localStorage.removeItem('id_user');
    this._router.navigate(['/login']);
  }
}