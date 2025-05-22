import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { UserStatusDialogComponent } from '../user-status-dialog/user-status-dialog.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-party',
  standalone: false,
  templateUrl: './list-party.component.html',
  styleUrl: './list-party.component.css'
})
export class ListPartyComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['PARENT_PARTY_CODE', 'PARTY_CODE', 'EMAIL_ADDRESS', 'ACTIVE_CODE', 'actions'];

  faEllipsisVertical = faEllipsisVertical;

  dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);

  openDialog(partyCode: any, userCode: any, partyStatus: any) {
    const dialogRef = this.dialog.open(UserStatusDialogComponent, {
      data: {
        partyCode: partyCode,
        userCode: userCode,
        partyStatus: partyStatus
      }
    })

    dialogRef.afterClosed().subscribe(() => {
      this.fetchParties();
    });
  }

// partyList: any = [
//   { PARENT_PARTY_CODE: "ABC", PARTY_CODE: "FZZTYUED", EMAIL_ADDRESS: "karthickselvan07@gmail.com", ACTIVE_CODE: "ACTIVE" }
// ]

partyList = new MatTableDataSource<any>();
length: any = "";

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private apiService: ApiService) { }

ngAfterViewInit(): void {
  this.partyList.paginator = this.paginator
}

ngOnInit(): void {
  this.fetchParties();
}

fetchParties() {

  this.apiService.getParties().subscribe({
    next: (res) => {
      this.partyList.data = res.partiesList;
      this.length = res.totalCount;
    },
    error: (err) => {
      console.log(err);
      this._snackBar.open(err.message, 'Close', { duration: 2000 });
    }
  })
}

deleteParty(party: any) {
  const dialogRef = this.dialog.open(DeletePartyComponent, {
    data: {
      party: party,
      list: this.partyList
    }
  });

  dialogRef.afterClosed().subscribe((updatedList: any[]) => {
    if (updatedList) {
      this.partyList.data = updatedList;

      // console.log(this.partyList.data);

      this._snackBar.open('User deleted successfully', 'Close', { duration: 2000 });
    }
  });
}

  // deleteParty(party: any) {
  //   const index = this.partyList.data.indexOf(party);
  //   if (index > -1) {
  //     this.partyList.data.splice(index, 1);
  //     this.partyList.data = [...this.partyList.data]
  //   }
  // }
}

@Component({
  selector: 'app-list-user',
  templateUrl: './delete-party.component.html',
  standalone: false
})
export class DeletePartyComponent {

  dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  party = this.data.party;
  partyList = this.data.list;

  deleteUser() {
    const filteredData = this.partyList.data.filter((p: any) => p !== this.party);
    this.dialogRef.close(filteredData);
  }

  onClose() {
    this.dialogRef.close();
  }
}
