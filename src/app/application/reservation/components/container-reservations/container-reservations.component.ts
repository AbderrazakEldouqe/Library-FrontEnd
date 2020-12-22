import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubSink} from 'subsink';
import {Reservation} from '../../../../_core/models/reservation';
import {NotificationService} from '../../../../_core/services/notification.service';
import {JsService} from '../../../../_core/services/js.service';
import {ReservationService} from '../../services/reservation.service';
import {ActionsReservationService} from '../../services/actions-reservation.service';

@Component({
  selector: 'app-container-reservations',
  templateUrl: './container-reservations.component.html',
  styleUrls: ['./container-reservations.component.css']
})
export class ContainerReservationsComponent implements OnInit, OnDestroy {

  private subs = new SubSink();
  allReservations: Reservation[] = [];
  delayedReservations: Reservation[] = [];

  constructor(private reservationService: ReservationService,
              private notification: NotificationService,
              private actionsReservationService: ActionsReservationService,
              private jsService: JsService) {
  }

  ngOnInit(): void {
    this.getAllReservations();
    this.getAllDelayedReservations();
    this.subs.add(
      this.actionsReservationService.requestActionsReservation.subscribe((req) => {
        this.handleActions(req);
      }));
  }

  getAllReservations(): void {
    this.subs.add(
      this.reservationService.getAll().subscribe((res: Reservation[]) => {
        this.allReservations = res;
      })
    );
  }

  getAllDelayedReservations(): void {
    this.subs.add(
      this.reservationService.getAllDelayedReservations().subscribe((res: Reservation[]) => {
        this.delayedReservations = res;
      })
    );
  }

  handleActions(req: any): void {
    if (req.action === 'accord') {
      this.accordReservation(req);
    } else if (req.action === 'return') {
      this.returnReservation(req);
    } else if (req.action === 'cancel') {
      this.cancelReservation(req);
    }
  }

  accordReservation(req: any): void {
    this.subs.add(
      this.reservationService.accordReservationBook(req.data.id, {estimated_return_date: req.data.estimated_return_date}
      ).subscribe((res: Reservation) => {
        this.allReservations = this.jsService.modifyObjectElementFromArrayByKey(this.allReservations, res, 'id');
        this.notification.success(`Book has been delivered !`, '');
      })
    );
  }

  returnReservation(req: any): void {
    this.subs.add(
      this.reservationService.returnReservationBook(req.data.id, {}).subscribe((res: Reservation) => {
        // this.allReservations = this.jsService.modifyObjectElementFromArrayByKey(this.allReservations, res, 'id');
        this.allReservations = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.allReservations, res, 'id'));
        this.notification.success(`Book has been returned !`, '');
      })
    );
  }

  cancelReservation(req: any): void {
    this.subs.add(
      this.reservationService.cancelReservationBook(req.data.id, {}).subscribe((res: Reservation) => {
        // this.allReservations = this.jsService.modifyObjectElementFromArrayByKey(this.allReservations, res, 'id');
        this.allReservations = this.jsService.spread(this.jsService.deleteObjectElementFromArrayByKey(this.allReservations, res, 'id'));
        this.notification.success(`has been canceled !`, '');
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
