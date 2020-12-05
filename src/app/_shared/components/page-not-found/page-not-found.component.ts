import { Component, OnInit } from '@angular/core';
import {shake} from '../../../_core/animations/route-animations';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
  animations: [shake]
})
export class PageNotFoundComponent implements OnInit {
  shake: any;
  constructor() { }

  ngOnInit(): void {
  }

}
