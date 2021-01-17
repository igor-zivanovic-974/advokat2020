import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationsService } from 'angular2-notifications';
import { throwError } from 'rxjs';
import { environment } from '@env/environment';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  apiUrl = environment.serverUrl;
  // schedulerApiUrl = environment.serverUrlBase;
  // eventWebSocketUrl = environment.eventWebSocketUrl;

  _errorHeppend = new BehaviorSubject<string>('');
  errorHappend$ = this._errorHeppend.asObservable();
  errMsg: string;
  st: any = this.translateService.get('api.successTitle');
  sc: any = this.translateService.get('api.successCreate');
  su: any = this.translateService.get('api.successUpdate');
  sd: any = this.translateService.get('api.successDelete');
  er: any = this.translateService.get('api.error');
  notificationsOptions = {
    timeOut: 2000,
    showProgressBar: true,
    pauseOnHover: false,
    clickToClose: false,
    maxLength: 100,
  };

  constructor(
    private notificationService: NotificationsService,
    private router: Router,
    private translateService: TranslateService
  ) {}

  displayErrorMessageFromApi(error: any) {
    const title: any = this.translateService.get('error');
    // if ((error.error && error.error.length > 0) || (error.error.error && error.error.error.length > 0) || error._body) {
    this.notificationService.error(
      title.value,
      // error.error ? (error.error.error ? error.error.error : error.error) : error._body,
      error.message,
      {
        timeOut: 5000,
        showProgressBar: true,
        pauseOnHover: false,
        clickToClose: false,
        maxLength: 100,
      }
    );
    // }

    // if (error instanceof Response) {
    //   const body: any = error.json() || '';
    //   const err = body.error || JSON.stringify(body);
    //   this.errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    // } else {
    //   this.errMsg = error.message ? error.message : error.toString();
    // }
  }

  displayHealthCheckErrorMessage() {
    this.router.navigate(['health-check']);
  }

  handleError(error: Response | any) {
    // if (error.url.includes('healthcheck')) {
    //   this.displayHealthCheckErrorMessage();
    // } else {
    //   if (error && error.url && error.url.includes('login') && (error.status === 401 || error.status === 403)) {
    //     const message: any = this.translate.get('application.login.invalidCredentials');
    //     const loginError = { error: message.value };
    //     this.displayErrorMessageFromApi(loginError);
    //   }
    // }
    this.displayErrorMessageFromApi(error);
    return throwError(this.errMsg);
  }
}
