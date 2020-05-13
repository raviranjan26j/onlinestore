import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend services/backend.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../user/login/login.component';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  error:boolean=false;
  passwordMismatch:boolean=false;
  constructor(private _backendService:BackendService,public  router:  Router) { }

  signup(formData){
    //this.error=true;
    if(formData.password==formData.confirmPassword){
    this._backendService.signup(formData.email,formData.password);
    localStorage.clear();
    //alert('account created successfully');
    this.router.navigate([LoginComponent]);
    }
    else{
      this.passwordMismatch=true;
    }
  }

  ngOnInit(): void {
  }

}
