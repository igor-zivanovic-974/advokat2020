import { Case } from './case';
import { Role } from './role';

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  role: Role;
  cases: Case[];
}
