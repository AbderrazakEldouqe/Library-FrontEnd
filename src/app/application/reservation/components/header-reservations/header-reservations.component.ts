import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header-reservations',
  templateUrl: './header-reservations.component.html',
  styleUrls: ['./header-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderReservationsComponent implements OnInit {

  @Input() name: string;
  @Input() option: string;

  constructor() {
  }

  ngOnInit(): void {
  }

}
