import { Employee } from '@app/@core/interfaces/employee';

export interface EmployeeState {
    currentEmployee: Employee,
    employees: Employee[];
} 