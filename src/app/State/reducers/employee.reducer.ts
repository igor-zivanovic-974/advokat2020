import { createAction, createReducer, on } from '@ngrx/store';
import * as AppState from '../../State/interfaces/appState';
import { EmployeeState } from '../interfaces/employeeState';

// deborah
export const employeeReducer = createReducer<EmployeeState>(
    on(createAction('[Employee] Get Employees'), (state): EmployeeState => {
        // console.log('Original state', + JSON.stringify(state));
        return {
            ...state,
            currentEmployee: state,
            employees: state

        }
    })
);