import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {AppError} from '../../../_shared/exceptions/app-error';
import {BadInputError} from '../../../_shared/exceptions/bad-input-error';
import {NotFoundError} from '../../../_shared/exceptions/not-found-error';
import {ErrorServerService} from '../../services/errors/error-server.service';
import {ErrorClientService} from '../../services/errors/error-client.service';
import {ValidationServerError} from '../../../_shared/exceptions/validation-server-error';
import {ErrorValidationServerService} from '../../services/errors/error-validation-server.service';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  // Error handling is important and needs to be loaded first.
  // Because of this we should manually inject the services with Injector.
  constructor(private injector: Injector) {
  }

  handleError(error: Error): void {
    const errorServer = this.injector.get(ErrorServerService);
    const errorClient = this.injector.get(ErrorClientService);
    const notifier = this.injector.get(NotificationService);
    const errorValidationServer = this.injector.get(ErrorValidationServerService);
    // const logger = this.injector.get(LoggingService);

    let message;
    // let stackTrace;
    if (error instanceof (AppError || BadInputError || NotFoundError || ValidationServerError)) {
      if (!navigator.onLine) {
        message = 'No Internet Connection';
      } else {
        // Server Error
        if (error instanceof ValidationServerError) {
          message = 'Merci de verifier votre saisie';
          const validationErrors = error?.originalError?.error?.errors;
          errorValidationServer.emitValidationServer(validationErrors);
        } else {
          message = errorServer.getServerMessage(error);
          // stackTrace = errorServer.getServerStack(error);
        }
      }
    } else {
      // Client Error
      message = errorClient.getClientMessage(error);
      // stackTrace = errorClient.getClientStack(error);
    }

    notifier.error(`Error : ${message}`, 'Error Message');

    // Always log errors
    // logger.logError(message, stackTrace);
    console.log('message', message);
    console.log('error', error);
  }
}
