import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionsReservationService {

  private requestActionsReservationDatasource = new Subject<any>();

  requestActionsReservation = this.requestActionsReservationDatasource.asObservable();

  private responseActionsReservationDatasource = new Subject<any>();

  responseActionsReservation = this.responseActionsReservationDatasource.asObservable();

  constructor() {
  }

  emitRequest(value: any): void {
    this.requestActionsReservationDatasource.next(value);
  }

  emitResponse(value: any): void {
    this.responseActionsReservationDatasource.next(value);
  }
}
