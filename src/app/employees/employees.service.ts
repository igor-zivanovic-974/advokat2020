import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@app/@core/interfaces/Employee';
import { TranslateService } from '@ngx-translate/core';
import { PersistenceService } from '@app/@core/services/persistence.service';
import { NotificationsService } from 'angular2-notifications';
import { map, catchError, take } from 'rxjs/operators';
import { GlobalService } from '@app/shell/global.service';
import { Role } from '@app/@core';

const endpoints = {
  read: () => `employees`,
  create: () => `employees`,
  readOne: (id: number) => `employees/${id}`,
  update: (id: number) => `employees/${id}`,
  delete: (id: number) => `employees/${id}`,
  roles: () => `roles`
};
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  url = this.persistenceService.apiUrl; //  + '/employees';
  notificationsOptions: any;
  titles: any;
  // eUpdated$ = new Subject<boolean>();
  employees: Employee[];

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

  getEmployees(): Observable<Employee[]> {
    return this.http.get(`${this.url}/${endpoints.read()}`).pipe(
      map((res: Employee[]) => {
        this.employees = res;
        return res as Employee[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get(`${this.url}/${endpoints.readOne(id)}`).pipe( // , fd
      map((res: Employee) => {
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  createEmployee(body: Employee): Observable<Employee> {
    // const fd = new FormData();
    // fd.append('firstName', body.firstName);
    // fd.append('lastName', body.lastName);
    // fd.append('roleId', body.roleId.toString());
    return this.http.post(`${this.url}/${endpoints.create()}`, body).pipe(
      map((res: Employee) => {
        this.notificationService.success(this.titles.st.value, this.titles.sc.value, this.notificationsOptions);
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  updateEmployee(body: Employee): Observable<Employee> {
    return this.http.put(`${this.url}/${endpoints.update(body.id)}`, body).pipe(
      map((res: Employee) => {
        this.notificationService.success(this.titles.st.value, this.titles.su.value, this.notificationsOptions);
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete(`${this.url}/${endpoints.delete(id)}`).pipe(
      map((res: Employee) => {
        this.notificationService.success(this.titles.st.value, this.titles.sd.value, this.notificationsOptions);
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getRoles(): Observable<Role[]> {
    return this.http.get(`${this.url}/${endpoints.roles()}`).pipe(
      map((res: Role[]) => {
        return res as Role[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }
}
