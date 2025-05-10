import { Injectable } from '@angular/core';
import { CanActivate, CanActivateFn, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  
  canActivate(): boolean {
    const isLoggedIn = !!localStorage.getItem('token');
    console.log(isLoggedIn);
    if (isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
};

// export const authGuard: CanActivateFn = () => {
//   const isLoggedIn = !!localStorage.getItem('token')
//   console.log(isLoggedIn); 
//   return isLoggedIn;
// };