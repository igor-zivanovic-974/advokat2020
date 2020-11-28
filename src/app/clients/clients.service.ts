import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '@app/@core/interfaces/client';
import { TranslateService } from '@ngx-translate/core';
import { PersistenceService } from '@app/@core/services/persistence.service';
import { NotificationsService } from 'angular2-notifications';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  url = this.persistenceService.apiUrl + '/clients';
  st: any = this.translateService.get('api.successTitle');
  sc: any = this.translateService.get('api.successCreate');
  su: any = this.translateService.get('api.successUpdate');
  sd: any = this.translateService.get('api.successDelete');
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

  getClients(): Observable<Client[]> {
    return this.http.get(this.url).pipe(
      map((res: Client[]) => {
        return res as Client[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get(this.url + '/' + id).pipe(
      map((res: Client) => {
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  createClient(body: Client): Observable<Client> {
    return this.http.post(this.url, body).pipe(
      map((res: Client) => {
        this.notificationService.success(this.st.value, this.sc.value, this.notificationsOptions);
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  updateClient(body: Client): Observable<Client> {
    return this.http.put(this.url, body).pipe(
      map((res: Client) => {
        this.notificationService.success(this.st.value, this.su.value, this.notificationsOptions);
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  deleteClient(id: number): Observable<Client> {
    return this.http.delete(this.url + '/' + id).pipe(
      map((res: Client) => {
        this.notificationService.success(this.st.value, this.sd.value, this.notificationsOptions);
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }
}
