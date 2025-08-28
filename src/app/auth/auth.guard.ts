import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  //checking if the item exists in local storage
  const token = localStorage.getItem('token');

  if(token){
    return true; //user is logged in
  }

  //redirecting to the login page if the user is not logged in
  router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

  return false;
};
