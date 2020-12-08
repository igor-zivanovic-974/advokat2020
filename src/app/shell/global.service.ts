import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class GlobalService {
  isMobileScreen$ = new BehaviorSubject<boolean>(false);
  hasSideMenu$ = new BehaviorSubject<boolean>(false);
  hasMessages$ = new BehaviorSubject<boolean>(false);
  messageCounter$ = new BehaviorSubject<number>(null);
  messageCounter: number;
  titles = {
    st: this.translateService.get('api.successTitle'),
    sc: this.translateService.get('api.successCreate'),
    su: this.translateService.get('api.successUpdate'),
    sd: this.translateService.get('api.successDelete'),
  }
  notificationsOptions = {
    timeOut: 2000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 100,
  };

  constructor(private translateService: TranslateService) { }

  calcMessagesNumber(numMessages: number) {
    this.messageCounter$.subscribe((a) => (this.messageCounter = a));
    this.messageCounter$.next(this.messageCounter + numMessages);
  }
}
