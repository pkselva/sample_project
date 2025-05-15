import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-status-dialog',
  standalone: false,
  templateUrl: './user-status-dialog.component.html',
  styleUrl: './user-status-dialog.component.css'
})
export class UserStatusDialogComponent {

  dialog = inject(MatDialog);
  data = inject(MAT_DIALOG_DATA);
  _snackBar = inject(MatSnackBar);

  partyCode = this.data.partyCode;
  userCode = this.data.userCode;
  userStatus = this.data.userStatus;
  partyStatus = this.data.partyStatus;

  reason: any = "";

  constructor(private apiService: ApiService) { }

  onSubmit(reasonForm: NgForm) {

    console.log(reasonForm.value);

    if (this.userStatus === "ACTIVE") {

      const payload = {
        partyCode: this.partyCode,
        userCode: this.userCode,
        reason: this.reason
      }

      this.apiService.userActive(payload).subscribe({
        next: (res) => {
          console.log(res.message);
          this._snackBar.open(res.message, 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.log(err.error);

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
    else if (this.userStatus === "IN_ACTIVE") {

      const payload = {
        partyCode: this.partyCode,
        userCode: this.userCode,
        reason: this.reason
      }

      this.apiService.userInactive(payload).subscribe({
        next: (res) => {
          console.log(res.message);
          this._snackBar.open(res.message, 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.log(err.error);

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

    if (this.partyStatus === "ACTIVE") {

      const payload = {
        partyCode: this.partyCode,
        reason: this.reason
      }

      this.apiService.partyActive(payload).subscribe({
        next: (res) => {
          console.log(res.message);
          this._snackBar.open(res.message, 'Close', { duration: 3000 });
        },
        error: (err) => {
          console.log(err.error);

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
    else if (this.partyStatus === "IN_ACTIVE") {

      const payload = {
        partyCode: this.partyCode,
        reason: this.reason
      }

      this.apiService.partyInactive(payload).subscribe({
        next: (res) => {
          console.log(res.message);
          this._snackBar.open(res.message, 'Close', { duration: 2000 });
        },
        error: (err) => {
          console.log(err.error);

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

    this.dialog.closeAll();
  }

  onClose() {
    this.dialog.closeAll();
  }
}
