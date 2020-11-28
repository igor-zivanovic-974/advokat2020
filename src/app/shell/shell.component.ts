import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from './global.service';

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

  constructor(private _globalService: GlobalService) {
    this.getScreenSize();

    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    this.isMobileScreen = !!this.isMobileScreen$;
    this.hasSideMenu$ = this._globalService.hasSideMenu$;
    this.hasSideMenu = !!this.hasSideMenu$;
    this._globalService.hasSideMenu$.pipe(takeUntil(this.unsubscribe$)).subscribe((value: any) => {
      this.hasSideMenu = value;
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
}
