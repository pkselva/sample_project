import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { ApiService } from '../../services/api.service';

interface User {
  name: string;
  userId: number;
  partyCode: string;
  partyName: string;
}

@Component({
  selector: 'app-list-user',
  standalone: false,
  templateUrl: './list-user.component.html',
  styleUrl: './list-user.component.css'
})
export class ListUserComponent implements OnInit {
  displayedColumns: string[] = ['PARTY_NAME', 'PARTY_CODE', 'LAST_UPDATED_ON','ACTIVE_CODE', 'actions'];

  userList: any[] = [];
  pageSize: any = 10;
  pageIndex: any = 0;
date: any;

  constructor(private apiService: ApiService) { }

  onPageChange(e: PageEvent) {
    console.log(e)
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
    this.fetchUsers();
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
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      },
      sorting: {
        key: "createdOn",
        value: "asc"
      }
    }

    this.apiService.getUsers(payload).subscribe({
      next: (res) => {
        this.userList = res.usersList;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
