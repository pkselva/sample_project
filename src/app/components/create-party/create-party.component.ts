import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-party',
  standalone: false,
  templateUrl: './create-party.component.html',
  styleUrl: './create-party.component.css'
})
export class CreatePartyComponent {
  partyCode = "";
  partyName = "";
  partyEmail = "";
  partyMobile = "";
  userId = "";
  firstName = "";
  lastName = "";
  userEmail = "";
  userMobile = "";

  private _snackBar = inject(MatSnackBar);

  constructor(private apiService: ApiService) { }

  onSubmit(onboardingForm: NgForm) {

    console.log(onboardingForm.value)

    if (onboardingForm.valid) {
      const formValues = onboardingForm.value;

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
          onboardingForm.onReset();
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
  }

}
