import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdherentService {

  constructor(private http: HttpClient) {
  }

  reserve(resource: any, headersObject: {} = {}): Observable<any> {
    return this.http.post(`${environment.apiUrl}/adherentReservations/reserve`, resource, {headers: headersObject});
  }

  getCanceledReservations(headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/adherentReservations/canceledBooks`, {headers: headersObject});
  }

  getOnGoingReservations(headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/adherentReservations/onGoingReservation`, {headers: headersObject});
  }

  getUnreturnedReservations(headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/adherentReservations/unreturnedBooks`, {headers: headersObject});
  }

  getReturnedReservations(headersObject: {} = {}): Observable<any> {
    return this.http.get(`${environment.apiUrl}/adherentReservations/returnedBooks`, {headers: headersObject});
  }
}
