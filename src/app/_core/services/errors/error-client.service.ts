import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorClientService {

  constructor() {
  }

  getClientMessage(error: Error): string {
    if (!navigator.onLine) {
      return 'No Internet Connection';
    }
    return error.message ? error.message : error.toString();
  }

  getClientStack(error: Error): string | undefined {
    return error.stack;
  }
}
