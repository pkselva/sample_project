import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  faEllipsisVertical = faEllipsisVertical;
  private _snackBar = inject(MatSnackBar);

  token = localStorage.getItem('token')

  getToken = {
    apiAccessSessionToken: `Bearer ${this.token}`
  }

  isSidebarOpen: Boolean | undefined;

  constructor(private apiservice: ApiService, private router: Router) { }

  onSignOut() {

    this.apiservice.logout(this.getToken).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.removeItem('token');
        this.router.navigate(['/', 'login']);
        this._snackBar.open(res.message, 'Close', { duration: 2000 });
      },
      error: (err) => {
        if (err.error[0].errors[0].message === "Session token already inActive") {
          localStorage.removeItem('token');
          this.router.navigate(['/', 'login']);
          this._snackBar.open('Logged Out Successfully', 'Close', { duration: 2000 });
        }
      }
    });
  }

  onAuth() {

    this.apiservice.authorize(this.getToken).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}