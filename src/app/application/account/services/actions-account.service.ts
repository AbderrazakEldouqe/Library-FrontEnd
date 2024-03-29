import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionsAccountService {

  private requestActionsAccountDatasource = new Subject<any>();

  requestActionsAccount = this.requestActionsAccountDatasource.asObservable();

  private responseActionsAccountDatasource = new Subject<any>();

  responseActionsAccount = this.responseActionsAccountDatasource.asObservable();

  constructor() {
  }

  emitRequest(value: any): void {
    this.requestActionsAccountDatasource.next(value);
  }

  emitResponse(value: any): void {
    this.responseActionsAccountDatasource.next(value);
  }
}
