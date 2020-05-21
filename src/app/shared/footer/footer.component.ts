import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
 sociallink:any;
  constructor() { }

  ngOnInit(): void {
    this.sociallink=environment.socialLink;
  }
  

}
