import { Employee } from './employee';

export interface Note {
  id: number;
  text: string;
  date: Date;
  employee: Employee;
  caseId: number;
}
