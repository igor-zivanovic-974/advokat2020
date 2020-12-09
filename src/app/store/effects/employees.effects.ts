import { Injectable } from '@angular/core';
import { EmployeesService } from '@app/employees/employees.service';
import { Effect, Actions, ofType } from '@ngrx/effects';
import * as employeesActions from '../../store/actions/employees.actions';
import { Employee } from '@app/@core/interfaces/employee';
import { switchMap, map } from 'rxjs/operators';

@Injectable()
export class EmployeeEffects {

    constructor(
        private employeesService: EmployeesService,
        private actions$: Actions) { }

    // tslint:disable-next-line:member-ordering
    @Effect() loadEmployees$ = this.actions$.pipe(
        ofType(employeesActions.LOAD_EMPLOYEES),
        switchMap(() => this.employeesService.getEmployees()),
        map((employees: Employee[]) => (new employeesActions.LoadEmployeesSuccessAction(employees)))
    );

    // tslint:disable-next-line:member-ordering
    @Effect() deleteEmployee$ = this.actions$.pipe(
        ofType(employeesActions.DELETE_EMPLOYEE),
        switchMap((action: employeesActions.DeleteEmployeeAction) => this.employeesService.deleteEmployee(action.payload)),
        map((employee: Employee) => (new employeesActions.DeleteEmployeeSuccessAction(employee.id)))
    );
}