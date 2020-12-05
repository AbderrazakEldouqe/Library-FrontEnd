import {Injectable} from '@angular/core';
import {AppError} from '../../../_shared/exceptions/app-error';
import {BadInputError} from '../../../_shared/exceptions/bad-input-error';
import {NotFoundError} from '../../../_shared/exceptions/not-found-error';
import {HttpErrorResponse} from '@angular/common/http';

export enum CustumErrorCode {
  UN_KNOW = 'Unknown Error',
}

@Injectable({
  providedIn: 'root'
})
export class ErrorServerService {

  constructor() {
  }

  getServerMessage(error: (AppError | BadInputError | NotFoundError)): string {
    if (error.originalError === CustumErrorCode.UN_KNOW) {
      return 'Server is Down';
    }
    return error.originalError;
  }

  getServerStack(error: HttpErrorResponse): string {
    // handle stack trace
    return 'stack';
  }
}
