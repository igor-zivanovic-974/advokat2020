import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@app/@core/auth';
import { I18nService } from '@app/i18n';
import { Observable } from 'rxjs';
import { GlobalService } from '../global.service';

// import { AuthenticationService, I18nService } from '@app/@core';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  menuHidden = true;
  param = { value: 'world' };
  credentials: any;
  hasMessages$: Observable<boolean>;
  messageCounter$: Observable<number>;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private i18nService: I18nService,
    private headerService: HeaderService,
    private _globalService: GlobalService
  ) {
    // document.addEventListener('click', this.toggleMenuItems.bind(this));
    this.hasMessages$ = this._globalService.hasMessages$;
    this.messageCounter$ = this._globalService.messageCounter$;
  }

  ngOnInit() { }

  // toggleMenu() {
  //   this.menuHidden = !this.menuHidden;
  // }

  toggleActive() {
    console.log('usao u toggleActive na header stranici');
    this.menuHidden = !this.menuHidden;
    console.log(this.menuHidden);
    this.headerService.menuHidden.emit(this.menuHidden);
    console.log('poslao poruku ' + this.menuHidden);
  }

  // hideMenu(event: any) {
  //   if (!document.getElementById('header') || !document.getElementById('header').contains(event.target)) {
  //     this.headerService.hamburgerClicked.emit(false);
  //   }
  // }

  setLanguage(language: string) {
    this.i18nService.language = language;
  }

  logout() {
    this.authenticationService.logout().subscribe(() => this.router.navigate(['/login'], { replaceUrl: true }));
  }

  get currentLanguage(): string {
    return this.i18nService.language;
  }

  get languages(): string[] {
    return this.i18nService.supportedLanguages;
  }

  get username(): string | null {
    const credentials = this.authenticationService.credentials;
    return credentials ? credentials.username : null;
  }
}
