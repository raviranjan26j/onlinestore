import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/backend services/backend.service';
import { Router } from '@angular/router';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  @Input() pageTitle : string;
  @Input() pageIcon: string;
  @Input() help:string;
  @Input() photourl:string;
  configData;
  counter=0;
  userstatuscolor="warn";
  constructor(private _backendservice:BackendService,public router:Router) { }

  ngOnInit(): void {
    console.log(this.photourl+"photo")
    this.configData=this._backendservice.getConfig();
    console.log("config"+this.configData)
    var user= JSON.parse(localStorage.getItem("user"));
    console.log(user!=null)
    if(user!=null){
    this.photourl=user.photoURL;
    }
    if(this.photourl==undefined){
    this.photourl="assets/images/profile_img.png"
    }
    console.log(this.photourl+"====photourl")
  }

  logout(){
    return this._backendservice.logout().then((success)=>
    {
      localStorage.clear();
      this.router.navigate(['/login']);
      window.location.reload();
    });
  }
  gotoServices(){
    this.router.navigate(['/services']);
  }

}
