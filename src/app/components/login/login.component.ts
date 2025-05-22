import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  orgCode = '';
  loginId = '';
  keyword = '';
  error = '';

  showPassword = false;

  private _snackBar = inject(MatSnackBar);

  constructor(private apiService: ApiService, private router: Router) { }

  ngOnInit(): void {
    const getToken = localStorage.getItem('token');

    if (getToken) {
      this.router.navigate(['dashboard']);
    }
  }

  onSubmit(loginForm: NgForm) {

    console.log(loginForm)
    if (loginForm.valid) {

      this.apiService.login(this.orgCode, this.loginId, this.keyword).subscribe({
        next: (res) => {
          let withOutBearer = res.session.apiAccessSessionToken.split(" ")[1];
          localStorage.setItem('token', withOutBearer || '');
          this.router.navigate(['/']);
          this._snackBar.open(res.status, 'Close', { duration: 2000 })
        },
        error: (err) => {
          console.log(err);

          let delay = 0;
          for (let error of err.error[0].errors) {
            setTimeout(() => {
              this._snackBar.open(error.message, 'Close', { duration: 2000 });
            }, delay);

            delay += 2000;
          }
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
