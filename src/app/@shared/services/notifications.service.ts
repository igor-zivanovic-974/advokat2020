import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';
export const NOTIFICATION_TYPE = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(private notifier: NotifierService) {}

  showInfo(message: string) {
    this.notifier.notify(NOTIFICATION_TYPE.INFO, message);
  }

  showSuccess(message: string) {
    this.notifier.notify(NOTIFICATION_TYPE.SUCCESS, message);
  }

  showWarning(message: string) {
    this.notifier.notify(NOTIFICATION_TYPE.WARNING, message);
  }

  showError(message: string) {
    this.notifier.notify(NOTIFICATION_TYPE.ERROR, message);
  }
}
