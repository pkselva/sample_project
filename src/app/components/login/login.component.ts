import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  orgCode = '';
  loginId = '';
  keyword = '';
  error = '';

  showPassword = false;

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(loginForm: NgForm) {

    console.log(loginForm)
    if (loginForm.valid) {
      const data = {
        orgCode: this.orgCode,
        loginId: this.loginId,
        keyword: this.keyword,
      };

      this.apiService.login(data).subscribe({
        next: (res) => {
          alert("Login Successfully!");
          let withOutBearer = res.session.apiAccessSessionToken.split(" ")[1];
          localStorage.setItem('token', withOutBearer || '');
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = "Invalid Credentials";
          console.log(this.error);
        }
      });
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

}
