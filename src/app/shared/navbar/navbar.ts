import { ChangeDetectorRef, Component } from '@angular/core';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { GetUser } from '../../services/user/get-user';
import { Router } from '@angular/router';

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
      this.isLogged = true;
      if (this.user.role === "admin" || this.user.role === "super_admin") {
        localStorage.setItem("isAdmin", "true");
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
      this._router.navigate(["/products"]);
    }
  }

  navigateToProfile(){
    if (!this.user) {
      alert('User not loaded.');
      return;
    }
    this._router.navigate([`/user/${this.user.id_user}/profile`]);
  }

  navigateToManageUsers(){
    if (!this.isAdmin) {
      alert('You do not have permission to manage users.');
      return;
    }
    this._router.navigate(["/admin/users"]);
  }

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
    this.user = undefined;
    this.isAdmin = false;
    localStorage.removeItem('isAdmin');
    this._router.navigate(['/login']);
  }
}