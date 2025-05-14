import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-party',
  standalone: false,
  templateUrl: './list-party.component.html',
  styleUrl: './list-party.component.css'
})
export class ListPartyComponent implements AfterViewInit, OnInit {
  displayedColumns: string[] = ['PARTY_NAME', 'PARTY_CODE', 'EMAIL_ADDRESS', 'MOBILE_NUMBER', 'actions'];

  faEllipsisVertical = faEllipsisVertical;

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

    this.apiService.getParties(payload).subscribe({
      next: (res) => {
        this.partyList.data = res.partiesList;
        this.length = res.totalCount;
      },
      error: (err) => {
        console.log(err);
        alert(err.message)
      }
    })
  }

  deleteParty(party: any) {
    const index = this.partyList.data.indexOf(party);
    if (index > -1){
      this.partyList.data.splice(index,1);
      this.partyList.data = [...this.partyList.data]
    }
  }
}
