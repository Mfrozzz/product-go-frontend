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

    this._getUserService.execute(token).subscribe((user: User) => {
      this.user = user;
      this.isLogged = true;
      if (this.user.role === "admin") {
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

  logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
    this.user = undefined;
    this.isAdmin = false;
    this._router.navigate(['/login']);
  }
}
