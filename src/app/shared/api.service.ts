import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { pipe } from 'rxjs';
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public employeeAPIUrl : string = "https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts"; // "http://localhost:3000/Employee/";// 
  public companyAPIUrl : string = "https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies"; // "http://localhost:3000/Companies/";
  constructor(private _http : HttpClient) { }


  PostEmployee(data : any){
    return this._http.post<any>(`${this.employeeAPIUrl}`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  DeleteEmployee(id : number){
    return this._http.delete<any>(`${this.employeeAPIUrl}/`+id)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  UpdateEmployee(id : number, data : any){
    return this._http.put<any>(`${this.employeeAPIUrl}/`+id,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  GetEmployees(){
    return this._http.get<any>(`${this.employeeAPIUrl}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  GetCompanies(){
    return this._http.get<any>(`${this.companyAPIUrl}`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

}
