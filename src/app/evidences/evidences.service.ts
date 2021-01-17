import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Evidence } from '@app/@core/interfaces/evidence';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { PersistenceService } from '@core/services/persistence.service';

const endpoints = {
  read: () => `evidences`,
  create: () => `evidences`,
  readOne: (id: number) => `evidences/${id}`,
  update: (id: number) => `evidences/${id}`,
  delete: (id: number) => `evidences/${id}`,
  // roles: () => `roles`,
};
@Injectable({
  providedIn: 'root',
})
export class EvidencesService {
  evidencesChanged$ = new BehaviorSubject<boolean>(false);
  evidences$ = new BehaviorSubject<Evidence[]>([]);
  url = this.persistenceService.apiUrl;

  constructor(private http: HttpClient, private persistenceService: PersistenceService) {}

  getEvidences() {
    this.http
      .get(`${this.url}/${endpoints.read()}`)
      .pipe(take(1))
      .subscribe((evs: Evidence[]) => {
        console.log(evs);
        this.evidences$.next(evs.slice());
        this.evidencesChanged$.next(true);
      });
  }

  addEvidence(ev: Evidence): Observable<Evidence> {
    return this.http.post(`${this.url}/${endpoints.create()}`, ev).pipe(
      take(1),
      map((e: Evidence) => {
        this.getEvidences();
        return e;
      })
    );
  }

  deleteEvidence(id: number) {
    return this.http.delete(`${this.url}/${endpoints.delete(id)}`).pipe(
      take(1),
      map(() => {
        this.getEvidences();
        return;
      })
    );
  }
}
