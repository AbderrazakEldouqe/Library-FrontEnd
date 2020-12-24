import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
  AfterViewInit,
  OnChanges, ChangeDetectorRef
} from '@angular/core';
import {Reservation} from '../../../../../_core/models/reservation';
import {environment} from '../../../../../../environments/environment';
import mediumZoom from 'medium-zoom';

@Component({
  selector: 'app-list-my-reservations',
  templateUrl: './list-my-reservations.component.html',
  styleUrls: ['./list-my-reservations.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListMyReservationsComponent implements OnInit, OnChanges {

  @Input() reservationsData: Reservation[] = [];
  @Input() actionsCell = false;
  @Input() idPagination = null;
  @Output() cancelReservationEvent = new EventEmitter();
  apiUrlImage = environment.apiImageUrl;
  // mz = mediumZoom('img');
  config = {
    id: 'custom',
    itemsPerPage: 4,
    currentPage: 1,
    totalItems: this.reservationsData.length
  };
  tableSizes = [4, 8, 10, 14];
  filter = '';

  constructor(private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  onSubmitCancelReservation(reservation: Reservation): void {
    this.cancelReservationEvent.emit(reservation);
  }

  trackById(index, item): any {
    return item ? item.id : undefined;
  }

  onTableSizeChange(event): void {
    this.config.itemsPerPage = event.target.value;
    this.config.currentPage = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.idPagination) {
      this.config.id = this.idPagination;
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   setTimeout(() => {
  //     this.mz.detach('img');
  //     this.mz = mediumZoom('img');
  //     // alert('ok');
  //   }, 10000);
  // }
  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     mediumZoom('img');
  //     // alert('ok');
  //   }, 10000);
  //   mediumZoom('img');
  //   this.mz.detach('img');
  //   this.mz = mediumZoom('img');
  // }
}
