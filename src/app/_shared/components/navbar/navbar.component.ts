import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {

  @Input() name = '';
  @Output() logoutEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  logout(): void {
    this.logoutEvent.emit(true);
  }
}
