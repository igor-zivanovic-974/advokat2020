import { Component, OnInit } from '@angular/core';
import { HelperService } from '@app/@core/services/helper.service';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  param = { value: 'world' };
  day = new Date();
  month: any;
  monthName: any;
  time = new Date();
  menuHidden: boolean;
  menuClosed = false;

  constructor(private helperService: HelperService, private headerService: HeaderService) {
    this.headerService.menuHidden.subscribe((item: boolean) => {
      console.log('primljeno na side-meni stranici', item);
      this.menuHidden = item;
      // this.toggle();
    });
    this.month = this.day.getMonth();
    this.monthName = this.helperService.getMonth(this.month);

    setInterval(() => {
      this.time = new Date();
    }, 1000);
  }

  ngOnInit() {}

  toggleMenuItems() {
    console.log('usao u toggleMenuItems na side-menu stranici');
    this.menuHidden = !this.menuHidden;
    // if (this.toggleMenu) {
    //   this.menuClosed = true;
    // }
  }
}
