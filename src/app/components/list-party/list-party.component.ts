import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-list-party',
  standalone: false,
  templateUrl: './list-party.component.html',
  styleUrl: './list-party.component.css'
})
export class ListPartyComponent {
  displayedColumns: string[] = ['PARTY_NAME', 'PARTY_CODE', 'EMAIL_ADDRESS', 'MOBILE_NUMBER', 'actions'];
  
    userList: any[] = [];
    pageSize: any = 10;
    pageIndex: any = 0;
  
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
  
      this.apiService.getParties(payload).subscribe({
        next: (res) => {
          this.userList = res.partiesList;
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
}
