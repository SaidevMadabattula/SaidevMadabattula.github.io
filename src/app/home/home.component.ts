import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ContactPersonModel } from './home.component.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  formValue !: FormGroup;
  employeeData !: any; 
  employeeObj : ContactPersonModel = new ContactPersonModel();
  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor(private api: ApiService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: ['', [Validators.required]],
      country: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      companyId: ['', [Validators.required]],
      id: ['']
    })
    this.getEmployeeDetails();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  // Calling this Method on Click of Add button
  postEmployeeDetails() {
    this.employeeObj.name = this.formValue.value.name;
    this.employeeObj.country = this.formValue.value.country;
    this.employeeObj.phone = this.formValue.value.phone;
    this.employeeObj.companyId = this.formValue.value.companyId;
    this.api.PostEmployee(this.employeeObj)
      .subscribe(res => {
        console.log(res);
        let ref = document.getElementById('close');
      ref?.click();
      this.getEmployeeDetails();
      })
  }

  // Fetching all Contacts Details from API Service
  getEmployeeDetails() {
    this.api.GetEmployees()
    .subscribe(res=>{
      this.employeeData = res;
    })
  }

// Calling this Method on Click of Update button
  editEmployeeDetail(){
    this.employeeObj.name = this.formValue.value.name;
    this.employeeObj.country = this.formValue.value.country;
    this.employeeObj.phone = this.formValue.value.phone;
    this.employeeObj.companyId = this.formValue.value.companyId;
    this.api.UpdateEmployee(this.employeeObj.id, this.employeeObj)
   .subscribe(res=>{
     alert("Updated Successfully")
     let ref = document.getElementById('close');
     ref?.click();
     this.getEmployeeDetails();
   })
 }

 // Calling this Method on Click of Edit button
 onEdit(row : any){
  this.employeeObj.id = row.id;
  this.formValue.controls['name'].setValue(row.name);
  this.formValue.controls['country'].setValue(row.country);
  this.formValue.controls['phone'].setValue(row.phone);
  this.formValue.controls['companyId'].setValue(row.companyId);
  this.showUpdate = true;
  this.showAdd = false;
}

// Calling this Method on Click of Delete button
deleteEmployeeDetail(row : any){
  let clickedYes = confirm("Are you sure want to delete");
  if(clickedYes){
   this.api.DeleteEmployee(row.id)
   .subscribe(res=>{
     alert("Deleted Successfully");
     this.getEmployeeDetails();
   })
  }
 }
}
