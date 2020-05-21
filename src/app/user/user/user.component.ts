import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { WindowRefService } from 'src/app/window-ref.service';
import * as $ from 'jquery' 

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
data:any;
isavailable:boolean;
errmsg:string="";
pnr:string=""
  constructor(private winRef:WindowRefService) {
   }

  ngOnInit(): void {
    this.isavailable=false
  }
  
 getpnr(){
   console.log(this.errmsg);
   var self=this;
  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://indianrailways.p.rapidapi.com/index.php?pnr=4618033020",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "indianrailways.p.rapidapi.com",
      "x-rapidapi-key": "657ab2eb56msh718f5132b9eca2cp10fdf1jsn08241f53b607"
    }
  }
  
  $.ajax(settings).done(function (response) {
    console.log(response);
    self.data=response;
    self.errmsg=response.data;
    self.setdata(response);
  //  this.isavailable=true;
  });
  this.isavailable=true;
  
}
setdata(response){
 this.errmsg=response.error;
 this.isavailable=true;
}

}
