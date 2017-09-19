
import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    const msg = 'An unexpected error occurred.';
    alert(msg);
    console.error(msg, error);
  }
}
