import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Client } from '@app/@core/interfaces/client';
import { TranslateService } from '@ngx-translate/core';
import { PersistenceService } from '@app/@core/services/persistence.service';
import { NotificationsService } from 'angular2-notifications';
import { map, catchError } from 'rxjs/operators';
import { GlobalService } from '@app/shell/global.service';

const endpoints = {
  read: () => `clients`,
  create: () => `clients`,
  readOne: (id: number) => `clients/${id}`,
  update: (id: number) => `clients/${id}`,
  delete: (id: number) => `clients/${id}`,
};
@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  url = this.persistenceService.apiUrl;
  notificationsOptions: any;
  titles: any;

  constructor(
    private http: HttpClient,
    private persistenceService: PersistenceService,
    private notificationService: NotificationsService,
    private translateService: TranslateService,
    private _globalService: GlobalService
  ) {
    this.notificationsOptions = this._globalService.notificationsOptions;
    this.titles = this._globalService.titles;
  }

  getClients(): Observable<Client[]> {
    return this.http.get(`${this.url}/${endpoints.read()}`).pipe(
      map((res: Client[]) => {
        return res as Client[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getClientById(id: number): Observable<Client> {
    return this.http.get(`${this.url}/${endpoints.readOne(id)}`).pipe(
      map((res: Client) => {
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  createClient(body: Client): Observable<Client> {
    return this.http.post(`${this.url}/${endpoints.create}`, body).pipe(
      map((res: Client) => {
        this.notificationService.success(this.titles.st.value, this.titles.sc.value, this.notificationsOptions);
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  updateClient(body: Client): Observable<Client> {
    return this.http.put(`${this.url}/${endpoints.update(body.id)}`, body).pipe(
      map((res: Client) => {
        this.notificationService.success(this.titles.st.value, this.titles.su.value, this.notificationsOptions);
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  deleteClient(id: number): Observable<Client> {
    return this.http.delete(`${this.url}/${endpoints.delete(id)}`).pipe(
      map((res: Client) => {
        this.notificationService.success(this.titles.st.value, this.titles.sd.value, this.notificationsOptions);
        return res as Client;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }
}
