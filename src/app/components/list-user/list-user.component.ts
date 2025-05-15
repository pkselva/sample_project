import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UserStatusDialogComponent } from '../user-status-dialog/user-status-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['PARTY_NAME', 'PARTY_CODE', 'LAST_UPDATED_ON', 'ACTIVE_CODE', 'actions'];

  faEllipsisVertical = faEllipsisVertical;

  dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);

  openDialog(partyCode: any, userCode: any, userStatus: any) {
    this.dialog.open(UserStatusDialogComponent, {
      data: {
        partyCode: partyCode,
        userCode: userCode,
        userStatus: userStatus
      }
    })
  }

  // userList: any = [
  //   { PARENT_PARTY_CODE: "ABC", PARTY_CODE: "FZZTYUED", EMAIL_ADDRESS: "karthickselvan07@gmail.com", ACTIVE_CODE: "ACTIVE" }
  // ]

  userList = new MatTableDataSource<any>();
  length: any = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngAfterViewInit(): void {
    this.userList.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    const payload = {
      entityTypeCode: "API_GW_PARTY",
      filters: [],
      pagination: {
        pageSize: 1000,
        pageIndex: 0
      },
      sorting: {
        key: "createdOn",
        value: "asc"
      }
    }

    this.apiService.getUsers(payload).subscribe({
      next: (res) => {
        this.userList.data = res.usersList;
        this.length = res.totalCount;
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.message, 'Close', { duration: 2000 });
      }
    })
  }

  deleteUser(user: any) {
    const index = this.userList.data.indexOf(user);
    if (index > -1) {
      this.userList.data.splice(index, 1);
      this.userList.data = [...this.userList.data]
    }
  }
}