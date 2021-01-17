import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '@app/@core';
import { Note } from '@app/@core/interfaces/note';
import { PersistenceService } from '@app/@core/services/persistence.service';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  url = this.persistenceService.apiUrl + '/notes';
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

  getNotes(): Observable<Note[]> {
    return this.http.get(this.url).pipe(
      map((res: Note[]) => {
        return res as Note[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getNoteById(id: number): Observable<Note> {
    return this.http.get(this.url + '/' + id).pipe(
      map((res: Note) => {
        return res as Note;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
    // const n: Note = {
    //   id: 4,
    //   text: 'Note 4',
    //   date: new Date('2010-01-21'),
    //   employee: { 'id': 1, 'firstName': 'Pera', 'lastName': 'Peric', 'roleId': 2, 'role': 'operator' },
    //   caseId: 1
    // };
    // return of(n);
  }

  addNote(body: Note): Observable<Note> {
    //  TODO save note to case or separatelly
    return this.http.post(this.url, body).pipe(
      map((res: Note) => {
        this.notificationService.success(this.st.value, this.sc.value, this.notificationsOptions);
        return res as Note;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  editNote(body: Note): Observable<Note> {
    return this.http.put(this.url, body).pipe(
      map((res: Note) => {
        this.notificationService.success(this.st.value, this.sc.value, this.notificationsOptions);
        return res as Note;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  deleteNote(id: number): Observable<Note> {
    return this.http.delete(this.url + '/' + id).pipe(
      map((res: Note) => {
        this.notificationService.success(this.st.value, this.sd.value, this.notificationsOptions);
        return res as Note;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }
}
