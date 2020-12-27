import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Reservation} from '../../../../_core/models/reservation';

@Component({
  selector: 'app-list-reservations',
  templateUrl: './list-reservations.component.html',
  styleUrls: ['./list-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListReservationsComponent implements OnInit {

  @Input() allReservations: Reservation[] = [];
  @Input() delayedReservations: Reservation[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
