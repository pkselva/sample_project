import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  orgCode = '';
  loginId = '';
  keyword = '';
  confirmKeyword = '';
  error = '';

  showPassword = true;

  constructor(private apiService: ApiService, private router: Router) { }

  onSubmit(registerForm: NgForm) {

    if (this.orgCode.trim().length === 0 || this.loginId.trim().length === 0 || this.keyword.trim().length === 0) {
      this.error = "All Fields are Required"
    }
    else if (this.keyword !== this.confirmKeyword) {
      this.error = "Password do not match"
    }
    else if (registerForm.valid) {

      this.apiService.login(this.orgCode, this.loginId, this.keyword).subscribe({
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
