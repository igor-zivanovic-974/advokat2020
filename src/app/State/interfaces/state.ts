import * as AppState from '../../State/interfaces/appState';
import { CaseState } from './caseState';
import { ClientState } from './clientState';
import { EmployeeState } from './employeeState';

export interface State extends AppState.State {
    employees: EmployeeState;
    cases: CaseState;
    clients: ClientState;
}