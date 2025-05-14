import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

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
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
