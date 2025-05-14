import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private apiService: ApiService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    // const fullName = this.router.snapshot.queryParamMap.get('name');
    // const id = this.router.snapshot.queryParamMap.get('id');
    // const email = this.router.snapshot.queryParamMap.get('email');
    // const no = this.router.snapshot.queryParamMap.get('no');
    this.router.queryParamMap.subscribe(params => {
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
        alert(res.message);
      },
      error: (err) => {
        console.log(err.message);
        alert(err.message)
      } 
    })

  }
}
