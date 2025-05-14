import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private jwtHelper: JwtHelperService) { }
  
  canActivate(): boolean {
    const token = localStorage.getItem('token');

    console.log(token);
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    if(this.jwtHelper.isTokenExpired(token)){
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
};