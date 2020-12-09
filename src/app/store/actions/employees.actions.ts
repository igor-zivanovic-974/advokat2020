import { Employee } from '@app/@core';

export const LOAD_EMPLOYEES = 'LOAD_EMPLOYEES';
export const LOAD_EMPLOYEES_SUCCESS = 'LOAD_EMPLOYEES_SUCCESS';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';

export class LoadEmployeesAction {
    readonly type = LOAD_EMPLOYEES;
    constructor() { }
}

export class LoadEmployeesSuccessAction {
    readonly type = LOAD_EMPLOYEES_SUCCESS;
    constructor(public payload: Employee[]) { }
}

export class DeleteEmployeeAction {
    readonly type = DELETE_EMPLOYEE;
    constructor(public payload: number) { }
}

export class DeleteEmployeeSuccessAction {
    readonly type = DELETE_EMPLOYEE_SUCCESS;
    constructor(public payload: number) { }
}

export type Action = LoadEmployeesAction | LoadEmployeesSuccessAction | DeleteEmployeeAction | DeleteEmployeeSuccessAction;