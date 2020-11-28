import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Case } from '@app/@core/interfaces/case';
import { TranslateService } from '@ngx-translate/core';
import { PersistenceService } from '@app/@core/services/persistence.service';
import { NotificationsService } from 'angular2-notifications';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CasesService {
  url = this.persistenceService.apiUrl + '/cases';
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
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private notificationService: NotificationsService,
    private translateService: TranslateService
  ) {}

  getCases(): Observable<Case[]> {
    return this.http.get(this.url).pipe(
      map((res: Case[]) => {
        return res as Case[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getCaseById(id: number): Observable<Case> {
    return this.http.get(this.url + '/' + id).pipe(
      map((res: Case) => {
        return res as Case;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  createCase(body: Case): Observable<Case> {
    return this.http.post(this.url, body).pipe(
      map((res: Case) => {
        this.notificationService.success(this.st.value, this.sc.value, this.notificationsOptions);
        return res as Case;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  updateCase(body: Case): Observable<Case> {
    return this.http.put(this.url, body).pipe(
      map((res: Case) => {
        this.notificationService.success(this.st.value, this.su.value, this.notificationsOptions);
        return res as Case;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  deleteCase(id: number): Observable<Case> {
    return this.http.delete(this.url + '/' + id).pipe(
      map((res: Case) => {
        this.notificationService.success(this.st.value, this.sd.value, this.notificationsOptions);
        return res as Case;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  postFile(fileToUpload: File): Observable<boolean> {
    const endpoint = 'http://www.csm-testcenter.org/test'; // IZMENI endpoint rutu
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.http.post(endpoint, formData).pipe(
      // , { headers: yourHeadersConfig }
      map(() => {
        return true;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
    // catch((e) => this.handleError(e));
  }

  getLastInternalMark(): Observable<any> {
    return this.http.get(`${this.persistenceService.apiUrl}/last`).pipe(
      map((res: any) => {
        return res as any;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }
}
