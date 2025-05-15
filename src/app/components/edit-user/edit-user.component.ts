import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user',
  standalone: false,
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {
  userId!: any;
  user: any = {
    firstName: "",
    lastName: "",
    userId: "",
    emailAddress: "",
    mobileNumber: ""
  }

  private _snackBar = inject(MatSnackBar);

  constructor(private apiService: ApiService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // const fullName = this.router.snapshot.queryParamMap.get('name');
    // const id = this.router.snapshot.queryParamMap.get('id');
    // const email = this.router.snapshot.queryParamMap.get('email');
    // const no = this.router.snapshot.queryParamMap.get('no');
    this.route.queryParamMap.subscribe(params => {
      const fullName = params.get('name');
      this.user.firstName = fullName?.split(" ")[0];
      this.user.lastName = fullName?.split(" ")[1];
      this.user.userId = params.get('id');
      this.user.emailAddress = params.get('email');
      this.user.mobileNumber = params.get('no');
    })
  }

  onSubmit(updateForm: NgForm) {
    console.log(updateForm);

    const payload = {
      actionCode: "update",
      userData: {
        userId: this.user.userId,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        emailAddress: this.user.emailAddress,
        mobileNumber: this.user.mobileNumber,
        parentPartyCode: "ABC"
      }
    }

    this.apiService.editUser(payload).subscribe({
      next: (res) => {
        console.log(res)
        this.router.navigate(['userlist']);
        this._snackBar.open(res.message);
      },
      error: (err) => {
        console.log(err);

        if (err.error.status === "error") {
          this._snackBar.open(err.error.message, 'Close', { duration: 2000 })
        }
        else {
          let delay = 0;
          for (let error of err.error[0].errors) {
            setTimeout(() => {
              this._snackBar.open(error.message, 'Close', { duration: 2000 });
            }, delay);

            delay += 2000;
          }
        }
      }
    });
  }
}
