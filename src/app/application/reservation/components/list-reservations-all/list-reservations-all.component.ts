import {ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {ActionsAccountService} from '../../../account/services/actions-account.service';
import {Reservation} from '../../../../_core/models/reservation';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActionsReservationService} from '../../services/actions-reservation.service';

@Component({
  selector: 'app-list-reservations-all',
  templateUrl: './list-reservations-all.component.html',
  styleUrls: ['./list-reservations-all.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListReservationsAllComponent implements OnInit {

  @Input() allReservations: Reservation[] = [];
  selectedReservation: Reservation = null;
  form: FormGroup;
  @ViewChild('closeModal') closeModal: ElementRef;
  minDate = new Date();
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.allReservations.length
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor(private actionsReservationService: ActionsReservationService) {
  }

  ngOnInit(): void {
    this.initialFormGroupe();
  }

  initialFormGroupe(): void {
    this.form = new FormGroup({
      estimated_return_date: new FormControl(null, [Validators.required])
    });
  }

  onSubmitAccordReservation(): void {
    this.actionsReservationService.emitRequest({
      action: 'accord',
      source: 'all',
      data: {estimated_return_date: this.form.get('estimated_return_date').value, id: this.selectedReservation.id}
    });
    this.closeModal.nativeElement.click();
  }

  onSubmitCancelReservation(reservation: Reservation): void {
    this.actionsReservationService.emitRequest({
      action: 'cancel',
      source: 'all',
      data: {id: reservation.id}
    });
  }

  onSubmitReturnReservation(reservation: Reservation): void {
    this.actionsReservationService.emitRequest({
      action: 'return',
      source: 'all',
      data: {id: reservation.id}
    });
  }

  clearModal(): void {
    this.selectedReservation = null;
    this.form.reset();
  }

  trackById(index, item): any {
    return item ? item.id : undefined;
  }

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }

}
