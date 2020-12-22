import {Injectable} from '@angular/core';
import {DataService} from '../../../_core/services/data.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService extends DataService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/borrowedBooks`, http);
  }

  getAllDelayedReservations(headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/borrowedBooks/delay`, {headers: headersObject});
  }

  accordReservationBook(id: any, resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.put(`${environment.apiUrl}/borrowedBooks/according/${id}`, resource, {headers: headersObject});
  }

  cancelReservationBook(id: any, resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.put(`${environment.apiUrl}/borrowedBooks/canceling/${id}`, resource, {headers: headersObject});
  }

  returnReservationBook(id: any, resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.put(`${environment.apiUrl}/borrowedBooks/returning/${id}`, resource, {headers: headersObject});
  }
}
