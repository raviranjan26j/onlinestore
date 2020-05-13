import { Component, OnInit, Input } from '@angular/core';
import { BackendService } from 'src/app/backend services/backend.service';

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
  constructor(private _backendservice:BackendService) { }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))*10;
  }

  ngOnInit(): void {
    this.counter=0;
    this.configData=this._backendservice.getConfig();
    this._backendservice.getCartTotal().subscribe(
      (res)=>{
        res=this.getRandomInt(res);
        this.counter=res;
      }
    );

    this._backendservice.getUserStatus().subscribe(
      (res)=>{
        this.userstatuscolor=res?"primary":"warn";
      }
    );
  }

}
