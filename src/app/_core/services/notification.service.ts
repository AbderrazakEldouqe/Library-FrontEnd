import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  success(title: string, message: string): void {
    this.toastr.success(
      title,
      message,
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left'
      }
    );
  }

  error(title: string, message: string): void {
    this.toastr.error(
      title,
      message,
      {
        timeOut: 3000,
        positionClass: 'toast-bottom-left'
      }
    );
  }
}
