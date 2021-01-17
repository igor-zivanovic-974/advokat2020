import { Injectable } from '@angular/core';
import { Court, RegistrationMark } from '@app/@core';
import { Council } from '@app/@core/interfaces/council';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EditCaseService {
  councils: Council[] = [];
  rms: RegistrationMark[] = [];
  cns: KeyValuePair[] = [];
  cts: KeyValuePair[] = [];
  statusList: KeyValuePair[] = [];
  helpersDone$ = new BehaviorSubject(false);

  constructor() {}

  getHelperData() {
    forkJoin([
      this.getCouncils(1),
      this.getRegistrationMarks(1),
      this.getCourtNames(1),
      this.getCourtTypes(),
      this.getStatuses(),
    ])
      .pipe(
        take(1),
        map(
          ([councilList, rmList, courtNameList, courtTypeList, statusList]: [
            Council[],
            RegistrationMark[],
            KeyValuePair[],
            KeyValuePair[],
            KeyValuePair[]
          ]) => {
            this.councils = councilList;
            this.rms = rmList;
            this.cns = courtNameList;
            this.cts = courtTypeList;
            this.statusList = statusList;
            console.log(this.councils);
            console.log(this.rms);
            console.log(this.cns);
            console.log(this.cts);
            console.log(this.statusList);
          }
        )
      )
      .subscribe(() => {
        this.helpersDone$.next(true);
      });
  }

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
