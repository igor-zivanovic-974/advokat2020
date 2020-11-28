import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ContextMenuComponent } from '@app/@shared/context-menu/context-menu.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  hasSideMenu$: Observable<boolean>;
  isMobileScreen$: Observable<boolean>;
  hasSideMenu = false;
  isMobileScreen = false;
  unsubscribe$ = new Subject<void>();

  constructor(private _globalService: GlobalService, private modalService: NgbModal) {
    this.getPageParams();
  }

  ngOnInit() {
    this.getPageParams();
  }

  displayContextMenu(event: MouseEvent, link: string) {
    event.preventDefault();
    // console.log(event);
    // // console.log(link);
    // const x = event.x + 'px';
    // const y = event.y + 'px';
    // const modalRef = this.modalService.open(ContextMenuComponent, { size: 'xl' }); // position: {top: y, left: x} , title: 'aaa'
    // modalRef.componentInstance.link = link;

    // modalRef.componentInstance.x = x;
    // modalRef.componentInstance.x = y;
    // const el = document.getElementById('cntxtmnu');
    // el.style.position = 'absolute';
    // el.style.left = x + 'px';
    // el.style.top = y + 'px';
  }

  getPageParams() {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    this.isMobileScreen = !!this.isMobileScreen$;
    this.hasSideMenu$ = this._globalService.hasSideMenu$;
    // this._globalService.hasSideMenu$.pipe(takeUntil(this.unsubscribe$)).subscribe((value: any) => {
    //   debugger
    //   this.hasSideMenu$ = value;
    // });
    this.hasSideMenu = !!this.hasSideMenu$;
  }

  toggleSideMenu(hide?: boolean) {
    this.hasSideMenu = hide ? hide : this.hasSideMenu;
    this._globalService.hasSideMenu$.next(this.hasSideMenu);
  }

  closeSideMenu() {
    this._globalService.hasSideMenu$.next(false);
  }
}
