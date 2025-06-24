import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-users',
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './manage-users.html',
  styleUrl: './manage-users.css'
})
export class ManageUsers {
  isSubmitted = false;
  islogged = true;
  isAdmin = false;
  showDropdown = false;
  username = 'Admin';

  users = [
    { id: 1, name: 'João Silva', email: 'joao@email.com' },
    { id: 2, name: 'Maria Souza', email: 'maria@email.com' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com' },
  ];

  search = '';
  page = 1;
  perPage = 10;

  get filteredUsers() {
    return this.users.filter(u =>
      u.name.toLowerCase().includes(this.search.toLowerCase()) ||
      u.email.toLowerCase().includes(this.search.toLowerCase())
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

  prevPage() {
    if (this.page > 1) this.page--;
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  logout() {

  }
}
