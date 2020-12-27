import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.css']
})
export class HeaderProfileComponent implements OnInit {

  @Input() name: string;
  @Input() option: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
