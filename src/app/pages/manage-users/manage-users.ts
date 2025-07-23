import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ListUsers } from '../../services/user/list-users';

@Component({
  selector: 'app-manage-users',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css'
})
export class ManageUsers {
  isSubmitted = false;
  isAdmin = false;
  listUsers: User[] = [];

  constructor(private _router: Router, private _cdr: ChangeDetectorRef, private _listUsersService: ListUsers){}

  ngOnInit(){
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
      alert("You do not have permission to access this page.");
      this._router.navigate(['/products']);
    }
    this.getAllUsers();
  }

  getAllUsers() {
    this._listUsersService.execute().subscribe({
      next: (response) => {
        this.listUsers = response || [];
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      },
      complete: () => {
        this._cdr.detectChanges();
      }
    });
  }

  search = '';
  page = 1;
  perPage = 10;

  get filteredUsers() {
    return this.listUsers.filter(u =>
      u.username?.toLowerCase().includes(this.search.toLowerCase())
    );
  }

  get totalPages() {
    return Math.max(1, Math.ceil(this.filteredUsers.length / this.perPage));
  }

  get paginatedUsers() {
    const start = (this.page - 1) * this.perPage;
    return this.filteredUsers.slice(start, start + this.perPage);
  }

  onSearchChange() {
    this.page = 1;
  }

  onPerPageChange() {
    this.page = 1;
  }

  gotoDetails(id_user: number) {
    this._router.navigate([`admin/users/${id_user}`]);
  }

  deleteUser(id_user: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      // Call the delete user service here

      alert(`User with ID ${id_user} deleted successfully.`);
      this.getAllUsers();
    }
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

}