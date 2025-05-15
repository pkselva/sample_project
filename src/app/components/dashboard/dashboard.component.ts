import { Component } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  dataSource: any[] = [];
  activeCount = 0;
  inactiveCount = 0;

  pieChartData: ChartData<'pie'> = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        label: 'User Status',
        data: [0, 0],
        backgroundColor: ['#03fcc2', '#03fcec']

      }
    ]
  };

  pieChartType: 'pie' = 'pie';

  pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      }
    }
  }

  constructor(private apiService: ApiService) {
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
        this.dataSource = res.usersList || [];

        this.activeCount = this.dataSource.filter(user => user.ACTIVE_CODE === 'ACTIVE').length;
        this.inactiveCount = this.dataSource.filter(user => user.ACTIVE_CODE === 'IN_ACTIVE').length;

        this.pieChartData = {
          labels: ['Active', 'Inactive'],
          datasets: [
            {
              label: 'User Status',
              data: [this.activeCount, this.inactiveCount],
              backgroundColor: ['#03fcc2', '#03fcec']
            }
          ]
        }
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
