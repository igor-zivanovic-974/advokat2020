import { RegistrationMark } from '..';
import { Council } from './council';

export interface StateChange {
    id: number;
    caseId: number;
    dateOfChange: string;
    state: string;
    // council: Council;
    // registrationMark: RegistrationMark;
    // caseNumber: string;
    // year: string;
    active: boolean;
}