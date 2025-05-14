import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['PARTY_NAME', 'PARTY_CODE', 'LAST_UPDATED_ON', 'ACTIVE_CODE', 'actions'];

  faEllipsisVertical = faEllipsisVertical;

  userList = new MatTableDataSource<any>();
  length: any = "";

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private apiService: ApiService) { }

  ngAfterViewInit(): void {
    this.userList.paginator = this.paginator
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    const payload = {
      entityTypeCode: "API_GW_PARTY",
      filters: [
        {
          key: "activeCode",
          operator: "eq",
          value: "ACTIVE"
        }
      ],
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
      }
    })
  }
}