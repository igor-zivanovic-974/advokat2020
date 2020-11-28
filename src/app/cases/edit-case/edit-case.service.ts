import { Injectable } from '@angular/core';
import { Court, RegistrationMark } from '@app/@core';
import { Council } from '@app/@core/interfaces/council';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EditCaseService {
  constructor() {}

  getCouncils(courtId: number): Observable<Council[]> {
    return of([
      { id: 1, name: 'I' },
      { id: 2, name: 'II' },
      { id: 3, name: 'III' },
      // {id: 3, name: 'III', disabled: true},
      { id: 4, name: 'IV' },
      { id: 5, name: 'V' },
    ]);
  }

  getRegistrationMarks(courtId: number): Observable<RegistrationMark[]> {
    return of([
      { id: 1, name: 'P' },
      { id: 2, name: 'P1' },
      { id: 3, name: 'P2' },
    ]);
  }

  getCourtNames(courtTypeId: number): Observable<KeyValuePair[]> {
    return of([
      { id: 1, name: 'Prvi osnovni sud u Beogradu' },
      { id: 2, name: 'Drugi osnovni sud u Beogradu' },
      { id: 3, name: 'Treci osnovni sud u Beogradu' },
    ]);
  }

  getCourtTypes(): Observable<KeyValuePair[]> {
    return of([
      { id: 1, name: 'Osnovni sud' },
      { id: 2, name: 'Prekrsajni sud' },
      { id: 3, name: 'Upravni sud' },
      { id: 4, name: 'Visi sud' },
      { id: 5, name: 'Apelacioni sud' },
      { id: 6, name: 'Privredni sud' },
      { id: 7, name: 'Privredni apelacioni sud' },
    ]);
  }

  getStatuses(): Observable<KeyValuePair[]> {
    return of([
      { id: 1, name: 'U toku' },
      { id: 2, name: 'Ozalben' },
      { id: 3, name: 'Resen' },
      // { id: 4, name: '' }
    ]);
  }
}
