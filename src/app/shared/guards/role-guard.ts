import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const roleGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  if(typeof window === 'undefined') { return true; }
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const isSuperAdmin = localStorage.getItem("isSuperAdmin") === "true";

  if (isAdmin || isSuperAdmin) {
    return true;
  }

  Swal.fire({
    title: 'Access Denied',
    text: 'You do not have permission to access this page.',
    icon: 'error',
    customClass: {
      confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded'
    },
    buttonsStyling: false
  }).then(() => {
    router.navigate(['/go/products']);
  });
  return false;
};
