import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private url: string, public http: HttpClient) {
  }

  getAll(headersObject = {}): Observable<any> {
    return this.http.get(this.url, {headers: headersObject});
  }

  getOne(id: any, headersObject = {}): Observable<any> {
    return this.http.get(`${this.url}/${id}`, {headers: headersObject});
  }

  create(resource: any, headersObject = {}): Observable<any> {
    return this.http.post(this.url, resource, {headers: headersObject});
  }

  update(id: any, resource: any, headersObject = {}): Observable<any> {
    return this.http.put(`${this.url}/${id}`, resource, {headers: headersObject});
  }

  delete(id: any, headersObject = {}): Observable<any> {
    return this.http.delete(`${this.url}/${id}`, {headers: headersObject});
  }
}
