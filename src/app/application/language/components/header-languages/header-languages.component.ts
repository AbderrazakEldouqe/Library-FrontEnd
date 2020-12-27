import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-languages',
  templateUrl: './header-languages.component.html',
  styleUrls: ['./header-languages.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderLanguagesComponent implements OnInit {

  @Input() name: string;
  @Input() option: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
