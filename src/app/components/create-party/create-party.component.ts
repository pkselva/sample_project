import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-party',
  standalone: false,
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.css'
})
export class CreatePartyComponent implements OnInit {
  // partyCode = "";
  // partyName = "";
  // partyEmail = "";
  // partyMobile = "";
  // userId = "";
  // firstName = "";
  // lastName = "";
  // userEmail = "";
  // userMobile = "";

  onboardingForm!: FormGroup<any>;

  submitted = false;

  private _snackBar = inject(MatSnackBar);

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.onboardingForm = new FormGroup({
      partyCode: new FormControl(null, Validators.required),
      partyName: new FormControl(null, Validators.required),
      partyEmail: new FormControl(null, Validators.required),
      partyMobile: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      userId: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
      userEmail: new FormControl(null, Validators.required),
      userMobile: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    })
  }

  onSubmit() {

    this.submitted = true;

    console.log(this.submitted)

    console.log(this.onboardingForm)

    if (this.onboardingForm.valid) {
      const formValues = this.onboardingForm.value;

      const payload = {
        partyData: {
          partyCode: formValues.partyCode,
          partyName: formValues.partyName,
          emailAddress: formValues.partyEmail,
          mobileNumber: formValues.partyMobile
        },
        userData: {
          userId: formValues.userId,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          emailAddress: formValues.userEmail,
          mobileNumber: formValues.userMobile
        }
      };

      console.log(payload);

      this.apiService.createparty(payload).subscribe({
        next: (res) => {
          console.log(res);
          this._snackBar.open(res.message, 'Close', { duration: 2000 });
          this.onboardingForm.reset();
          this.submitted = false;
        },
        error: (err) => {
          console.log(err);

          let delay = 0
          for (let error of err.error[0].errors) {
            setTimeout(() => {
              this._snackBar.open(error.message, 'Close', { duration: 2000 });
            }, delay);

            delay += 2000;
          }
        }
      })
    }
    else{
      this.onboardingForm.markAllAsTouched();
    }
  }

}
