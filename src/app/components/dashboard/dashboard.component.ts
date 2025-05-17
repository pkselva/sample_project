import { Component, inject, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ApiService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  userDataSource: any[] = [];
  partyDataSource: any[] = [];
  filterData: any;

  activeCount = 0;
  inactiveCount = 0;
  userLength = 0;
  partyLength = 0;
  createStatus: any[] = [];

  jan = 0;
  feb = 0;
  mar = 0;
  apr = 0;
  may = 0;

  pieChart: any;
  lineChart: any;

  _snackBar = inject(MatSnackBar);

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
        this.userDataSource = res.usersList || [];
        this.userLength = res.totalCount;
        this.userChartData();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.message, 'Close', { duration: 2000 });
      }
    });

    this.apiService.getParties(payload).subscribe({
      next: (res) => {
        this.partyDataSource = res.partiesList;
        this.partyLength = res.totalCount;
        this.partyChartData();
      },
      error: (err) => {
        console.log(err);
        this._snackBar.open(err.message, 'Close', { duration: 2000 });
      }
    })
  }

  partyChartData() {
    const count: any = {};

    this.partyDataSource.forEach(item => {
      count[item.PARTY_NAME] = (count[item.PARTY_NAME] || 0) + 1;
    });

    const name = Object.keys(count);
    const values = Object.values(count);

    this.pieChart = new Chart("MyPieChart", {
      type: "doughnut",
      data: {
        labels: name,
        datasets: [
          {
            label: 'User Status',
            data: values
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right'
          },
          title: {
            display: true,
            text: 'Total Party Based on Name',
            padding: -2,
          }
        }
      }
    });

    this.createStatus = this.partyDataSource.map(item => {
      const data = item.CREATED_ON;
      const month = data.substring(0, 7);
      console.log(month)
      return month;
    });
    console.log(this.createStatus);

    this.jan = this.createStatus.filter(jan => jan === '2025-01').length;
    this.feb = this.createStatus.filter(feb => feb === '2025-02').length;
    this.mar = this.createStatus.filter(mar => mar === '2025-03').length;
    this.apr = this.createStatus.filter(apr => apr === '2025-04').length;
    this.may = this.createStatus.filter(may => may === '2025-05').length;

    console.log(this.jan, this.feb, this.mar, this.apr, this.may);

    this.lineChart = new Chart("partyLineChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'Party Count',
          data: [this.jan, this.feb, this.mar, this.apr, this.may],
          borderColor: 'rgb(75, 192, 192)',
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Party Created Based on Month'
          }
        }
      }
    });
  }

  userChartData() {
    this.activeCount = this.userDataSource.filter(user => user.ACTIVE_CODE === 'ACTIVE').length;
    this.inactiveCount = this.userDataSource.filter(user => user.ACTIVE_CODE === 'IN_ACTIVE').length;

    this.pieChart = new Chart("pieChart", {
      type: "pie",
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [
          {
            label: 'User Status',
            data: [this.activeCount, this.inactiveCount]
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'User Status'
          }
        }
      }
    })

    this.createStatus = this.userDataSource.map(item => {
      const data = item.CREATED_ON;
      const month = data.substring(0, 7);
      console.log(month)
      return month;
    });
    console.log(this.createStatus);

    this.jan = this.createStatus.filter(jan => jan === '2025-01').length;
    this.feb = this.createStatus.filter(feb => feb === '2025-02').length;
    this.mar = this.createStatus.filter(mar => mar === '2025-03').length;
    this.apr = this.createStatus.filter(apr => apr === '2025-04').length;
    this.may = this.createStatus.filter(may => may === '2025-05').length;

    console.log(this.jan, this.feb, this.mar, this.apr, this.may);

    this.lineChart = new Chart("lineChart", {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [{
          label: 'User Count',
          data: [this.jan, this.feb, this.mar, this.apr, this.may],
          borderColor: 'rgb(75, 192, 192)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'User Onboard Based on Month'
          }
        }
      }
    });
  }
}
