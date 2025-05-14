import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  faEllipsisVertical = faEllipsisVertical;

  token = localStorage.getItem('token')

  getToken = {
    apiAccessSessionToken: `Bearer ${this.token}`
  }

  isSidebarOpen = false;

  constructor(private apiservice: ApiService, private router: Router) { }

  onSignOut() {

    this.apiservice.logout(this.getToken).subscribe({
      next: (res) => {
        console.log(res);
        localStorage.removeItem('token');
        this.router.navigate(['/', 'login']);
      },
      error: (err) => {
        console.log(err);
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