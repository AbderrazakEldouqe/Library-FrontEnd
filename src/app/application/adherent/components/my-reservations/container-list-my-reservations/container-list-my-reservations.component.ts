import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {Reservation} from '../../../../../_core/models/reservation';
import {Role} from '../../../../../_core/models/role';
import {Account} from '../../../../../_core/models/account';
import {AdherentService} from '../../../services/adherent.service';
import {BookService} from '../../../../book/services/book.service';
import {NotificationService} from '../../../../../_core/services/notification.service';
import {JsService} from '../../../../../_core/services/js.service';
import {ReservationService} from '../../../../reservation/services/reservation.service';

@Component({
  selector: 'app-container-list-my-reservations',
  templateUrl: './container-list-my-reservations.component.html',
  styleUrls: ['./container-list-my-reservations.component.css']
})
export class ContainerListMyReservationsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  canceledReservations: Reservation[] = [];
  onGoingReservations: Reservation[] = [];
  unreturnedReservations: Reservation[] = [];
  returnedReservations: Reservation[] = [];

  constructor(private adherentService: AdherentService,
              private reservationService: ReservationService,
              private notification: NotificationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAllcanceledReservations();
    this.getAllonGoingReservations();
    this.getAllunreturnedReservations();
    this.getAllreturnedReservations();
  }

  getAllcanceledReservations(): void {
    this.subs.add(
      this.adherentService.getCanceledReservations().subscribe((res: Reservation[]) => {
        this.canceledReservations = res;
      })
    );
  }

  getAllonGoingReservations(): void {
    this.subs.add(
      this.adherentService.getOnGoingReservations().subscribe((res: Reservation[]) => {
        this.onGoingReservations = res;
      })
    );
  }

  getAllunreturnedReservations(): void {
    this.subs.add(
      this.adherentService.getUnreturnedReservations().subscribe((res: Reservation[]) => {
        this.unreturnedReservations = res;
      })
    );
  }

  getAllreturnedReservations(): void {
    this.subs.add(
      this.adherentService.getReturnedReservations().subscribe((res: Reservation[]) => {
        this.returnedReservations = res;
      })
    );
  }

  cancelReservation(reservation: Reservation): void {
    this.subs.add(
      this.reservationService.cancelReservationBook(reservation.id, {}).subscribe((res: Reservation) => {
        this.onGoingReservations = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.onGoingReservations, res, 'id'));
        this.canceledReservations = this.jsService.spread(this.canceledReservations, res);
        this.notification.success(`has been canceled !`, '');
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
