import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../../services/api.service';

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
          alert("Data Added Successfully");
          onboardingForm.reset();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
