import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-accounts',
  templateUrl: './header-accounts.component.html',
  styleUrls: ['./header-accounts.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderAccountsComponent implements OnInit {

  @Input() name: string;
  @Input() option: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
