import {moveIn, fallIn} from '../router.animation'
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css'],
  animations: [moveIn(), fallIn()],
  //host: { '[@moveIn]': '' }
})
export class AboutusComponent implements OnInit {
  state: string = '';
  constructor() { }

  ngOnInit(): void {
  }

}
