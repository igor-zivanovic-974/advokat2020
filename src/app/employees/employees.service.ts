import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '@app/@core/interfaces/Employee';
import { TranslateService } from '@ngx-translate/core';
import { PersistenceService } from '@app/@core/services/persistence.service';
import { NotificationsService } from 'angular2-notifications';
import { map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  url = this.persistenceService.apiUrl + '/Employees/';
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

  getEmployees(): Observable<Employee[]> {
    return this.http.get(this.url + '').pipe(
      // GetEmployees
      map((res: Employee[]) => {
        return res as Employee[];
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    const fd = new FormData();
    fd.append('id', id.toString());
    return this.http.post(this.url + '/' + id, fd).pipe(
      // GetEmployee
      map((res: Employee) => {
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  createEmployee(body: Employee): Observable<Employee> {
    const fd = new FormData();
    fd.append('firstName', body.firstName);
    fd.append('lastName', body.lastName);
    fd.append('roleId', body.roleId.toString());
    return this.http.post(this.url + '', fd).pipe(
      // InsertEmployee
      map((res: Employee) => {
        this.notificationService.success(this.st.value, this.sc.value, this.notificationsOptions);
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  updateEmployee(body: Employee): Observable<Employee> {
    return this.http.put(this.url + '/' + body.id, body).pipe(
      // UpdateEmployee
      map((res: Employee) => {
        this.notificationService.success(this.st.value, this.su.value, this.notificationsOptions);
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete(this.url + '/' + id).pipe(
      // DeleteEmployee
      map((res: Employee) => {
        this.notificationService.success(this.st.value, this.sd.value, this.notificationsOptions);
        return res as Employee;
      }),
      catchError((err: any) => this.persistenceService.handleError(err))
    );
  }
}
