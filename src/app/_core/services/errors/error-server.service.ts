import {Injectable} from '@angular/core';
import {AppError} from '../../../_shared/exceptions/app-error';
import {BadInputError} from '../../../_shared/exceptions/bad-input-error';
import {NotFoundError} from '../../../_shared/exceptions/not-found-error';
import {HttpErrorResponse} from '@angular/common/http';
import {ValidationServerError} from '../../../_shared/exceptions/validation-server-error';

export enum CustumErrorCode {
  UN_KNOW = 'Unknown Error',
}

@Injectable({
  providedIn: 'root'
})
export class ErrorServerService {

  constructor() {
  }

  getServerMessage(error: (AppError | BadInputError | NotFoundError | ValidationServerError)): string {
    if (error.originalError?.statusText === CustumErrorCode.UN_KNOW || error.originalError === CustumErrorCode.UN_KNOW) {
      return 'Server is Down';
    }
    // return error.originalError?.error?.message ? error.originalError?.error?.message : error.originalError.toString();
    return error.originalError?.error?.message ? error.originalError?.error?.message : error.originalError?.statusText;
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
