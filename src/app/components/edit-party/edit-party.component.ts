import { Component, inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-party',
  standalone: false,
  templateUrl: './edit-party.component.html',
  styleUrl: './edit-party.component.css'
})

export class EditPartyComponent implements OnInit {

  partyCode: any = "";
  partyName: any = "";
  partyEmail: any = "";
  partyMobile: any = "";

  private _snackBar = inject(MatSnackBar);

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params => {
      this.partyCode = params.get('id');
      this.partyName = params.get('name');
      this.partyEmail = params.get('email');
      this.partyMobile = params.get('no');
    })
  }

  onSubmit(editPartyForm: NgForm) {

    console.log(editPartyForm);

    const payload = {
      actionCode: "update",
      partyData: {
        partyCode: this.partyCode,
        partyName: this.partyName,
        emailAddress: this.partyEmail,
        mobileNumber: this.partyMobile
      }
    }

    this.apiService.editParty(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigate(['/partylist']);
        this._snackBar.open(res.message, 'Close', { duration: 2000 });

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
    })
  }
}
