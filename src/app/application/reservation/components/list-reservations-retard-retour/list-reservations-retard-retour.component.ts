import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Reservation} from '../../../../_core/models/reservation';
import {ActionsAccountService} from '../../../account/services/actions-account.service';

@Component({
  selector: 'app-list-reservations-retard-retour',
  templateUrl: './list-reservations-retard-retour.component.html',
  styleUrls: ['./list-reservations-retard-retour.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListReservationsRetardRetourComponent implements OnInit {

  @Input() delayedReservations: Reservation[] = [];
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.delayedReservations.length
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor(private actionsAccountServices: ActionsAccountService) {
  }

  ngOnInit(): void {
  }

  trackById(index, item): any {
    return item ? item.id : undefined;
  }

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }
}
