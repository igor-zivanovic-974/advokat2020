import { CaseHistory } from './caseHistory';
import { Client } from './client';
import { Council } from './council';
import { Court } from './court';
import { File } from './file';
import { KeyValuePair } from './keyValuePair';
import { RegistrationMark } from './registrationMark';
import { StateChange } from './stateChange';

export interface Case {
  id: number;
  stateChanges: StateChange[];
  internalMark: string;
  dateCreated: Date;
  dateUpdated: Date;
  clientId: number;
  court: Court;
  respondent: Client;
  prosecutor: Client;
  council: Council;
  registrationMark: RegistrationMark;
  caseNumber: string;
  year: string;
  caseTitle: string;
  subject: string;
  caseValue: string;
  notes: string[];
  files?: File[];
  evidences?: File[];
  hearingMinutes?: File[];
  expertises?: File[];
  decisions?: File[];
  other?: File[];
  status: KeyValuePair;
  active: boolean;
  caseHistory?: CaseHistory[];
}
