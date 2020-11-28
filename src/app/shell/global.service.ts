import { BehaviorSubject } from 'rxjs';

export class GlobalService {
  isMobileScreen$ = new BehaviorSubject<boolean>(false);
  hasSideMenu$ = new BehaviorSubject<boolean>(false);
  hasMessages$ = new BehaviorSubject<boolean>(false);
  messageCounter$ = new BehaviorSubject<number>(null);
  messageCounter: number;

  calcMessagesNumber(numMessages: number) {
    this.messageCounter$.subscribe((a) => (this.messageCounter = a));
    this.messageCounter$.next(this.messageCounter + numMessages);
  }
}
