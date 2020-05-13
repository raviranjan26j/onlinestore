import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  savedChanges:boolean=true;
  dataloading:boolean=false;
  error:boolean=false;
  dataLoading:boolean=false;
  errorMessage:string="";


  constructor() { }

  ngOnInit(): void {
    this.getUser();
  }
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit(filter){
    

  }
  logout(){

  }
  getUser(){

  }
  routeLoginPage(){

  }

}
