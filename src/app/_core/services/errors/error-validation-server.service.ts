import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ErrorValidationServerService {

  private responseValidationServerDatasource = new Subject<any>();

  responseValidationServer = this.responseValidationServerDatasource.asObservable();

  constructor() {
  }

  emitValidationServer(value: any): void {
    this.responseValidationServerDatasource.next(value);
  }

  setErrorsToFormGroup(errors, formGroup: FormGroup): void {
    Object.keys(errors).forEach(prop => {
      // console.log('p', prop);
      const formControl = formGroup.get(prop);
      if (formControl) {
        // activate the error message
        formControl.setErrors({
          serverError: errors[prop]
        });
      }
    });
  }
}
