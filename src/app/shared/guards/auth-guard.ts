import { CanActivateFn, Router } from '@angular/router';
import { isTokenExpired } from '../utils/isTokenExpired';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window === 'undefined') { 
    return true;
  }
  const token = localStorage.getItem('token');
  const router = inject(Router);
  if (!token || isTokenExpired(token)) {
    Swal.fire({
      icon: 'error',
      title: 'Session Expired',
      text: 'Please log in again to continue.',
      customClass: {
        confirmButton: 'bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded'
      },
      buttonsStyling: false,
      confirmButtonText: 'OK'
    }).then(()=>{
      router.navigate(['/login']);
      return false;
    });
  }
  return true;
};