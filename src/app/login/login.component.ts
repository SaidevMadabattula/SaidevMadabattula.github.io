import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormGroup,FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
import { UserModel } from '../shared/modal/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm !: FormGroup;
  public loginObj = new UserModel();

  constructor(private fb :FormBuilder, private http : HttpClient,private router : Router,private api : ApiService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:["",Validators.compose([Validators.required,Validators.email])],
      password:["", [Validators.required,
         Validators.minLength(8), 
         Validators.pattern(/[A-Z]/),
         Validators.pattern(/[!@#$]/),]]
    });
   localStorage.clear();
  }

// Calling this method on click of Login button
  login(){
    this.http.get<any>("https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/users")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email
      });
      if(user){
        alert("Login Success!!");
        this.router.navigate(['home']);
          this.loginForm.reset();
          localStorage.setItem('token','sadjaklsfjlkj928493weijfkoiru398rjksfjfao;o4i039480923urjfflkjsakln23k4j23kosdk0fifjksdjf0kljjkldkzhfnmzbcjw489237');
      }
      else{
        alert("Login is Unsuccessful!! due to invalid emailId or password");
      }
    },err=>{
      alert("Something went wrong!!")
    })
  }

}
