import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {DataService} from '../../../_core/services/data.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService extends DataService {

  constructor(http: HttpClient) {
    super(`${environment.apiUrl}/tasks`, http);
  }
}
