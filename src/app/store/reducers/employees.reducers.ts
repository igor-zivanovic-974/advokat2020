import { Employee } from '@app/@core/interfaces/employee';
import * as employeesActions from '../actions/employees.actions';

export function employeeReducer(state: any = [], action: employeesActions.Action) {
    switch (action.type) {
        case employeesActions.LOAD_EMPLOYEES_SUCCESS: {
            return action.payload;
        }
        case employeesActions.DELETE_EMPLOYEE_SUCCESS: {
            return state.filter((employee: Employee) => employee.id !== action.payload);
        }
        default: {
            return state;
        }
    }
}