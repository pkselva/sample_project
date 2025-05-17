import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ) { }
  
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    const isLoggedIn = !!token;

    console.log(token);
    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
};