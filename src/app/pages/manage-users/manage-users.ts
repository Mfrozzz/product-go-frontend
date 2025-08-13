import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { ListUsers } from '../../services/user/list-users';
import Swal from 'sweetalert2';

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
  hasUsers: boolean = false;
  usersLoaded: boolean = false;

  constructor(private _router: Router, private _cdr: ChangeDetectorRef, private _listUsersService: ListUsers, private _zone: NgZone){}

  ngOnInit(){
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin === "true") {
      this.isAdmin = true;
    }else{
      this.isAdmin = false;
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'You do not have permission to access this page.',
        customClass: {
          confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
        },
        confirmButtonText: 'OK',
        buttonsStyling: false,
      }).then(()=>{
        this._router.navigate(['/products']);
      });
    }
    this.getAllUsers();
  }

  getAllUsers() {
    this._listUsersService.execute().subscribe({
      next: (response) => {
        this.listUsers = response || [];
        this.hasUsers = this.paginatedUsers.length > 0;
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to fetch users. Please try again later.',
          customClass: {
            confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
          },
          confirmButtonText: 'OK',
          buttonsStyling: false,
        });
      },
      complete: () => {
        this._zone.run(() => {
          this.usersLoaded = true;
          this._cdr.detectChanges();
        });
      }
    });
    this._cdr.detectChanges();
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

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

}