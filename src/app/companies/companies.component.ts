import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
  companyData !:any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getCompanyDetails();
  }
  // Fetching Company Details from API Service
  getCompanyDetails(){
    this.api.GetCompanies()
    .subscribe(res=>{
      this.companyData = res;
    })
  }
}
