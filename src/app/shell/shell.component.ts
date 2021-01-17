import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from './global.service';
import { WebsocketService } from '@core/services/websocket.service';
import { ChatService } from '@core/services/chat.service';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit, OnDestroy {
  isMobileScreen$: Observable<boolean>;
  hasSideMenu$: Observable<boolean>;
  isMobileScreen: boolean;
  hasSideMenu: boolean;
  unsubscribe$ = new Subject<void>();

  private message = { author: 'Pera', message: 'idi spavaj' };

  constructor(
    private _globalService: GlobalService,
    private wsService: WebsocketService,
    private chatService: ChatService
  ) {
    this.getScreenSize();

    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    this.isMobileScreen = !!this.isMobileScreen$;
    this.hasSideMenu$ = this._globalService.hasSideMenu$;
    this.hasSideMenu = !!this.hasSideMenu$;
    this._globalService.hasSideMenu$.pipe(takeUntil(this.unsubscribe$)).subscribe((value: any) => {
      this.hasSideMenu = value;
    });

    // ws
    this.chatService.message.subscribe((msg: any) => {
      console.log('Response from WS Server: ');
      console.log(msg);
    });
  }

  ngOnInit() {}

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.isMobileScreen = !!(window.innerWidth < 768);
    this._globalService.isMobileScreen$.next(this.isMobileScreen);
    this.hasSideMenu = this.isMobileScreen;
    this._globalService.hasSideMenu$.next(this.hasSideMenu);
  }

  toggleSideMenu() {
    this.hasSideMenu = !this.hasSideMenu;
    this._globalService.hasSideMenu$.next(this.hasSideMenu);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  sendMessage() {
    console.log('New Message sent from client');
    console.log(this.message);
    this.chatService.message.next(this.message);
  }
}
