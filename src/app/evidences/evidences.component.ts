import { Component, OnInit } from '@angular/core';
import { Evidence } from '@app/@core/interfaces/evidence';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { EvidencesService } from './evidences.service';

@Component({
  selector: 'app-evidences',
  templateUrl: './evidences.component.html',
  styleUrls: ['./evidences.component.scss'],
})
export class EvidencesComponent implements OnInit {
  evidences: Evidence[]; //
  evidences$: Observable<Evidence[]>;
  isLoading: boolean;

  constructor(
    private evidencesService: EvidencesService,
    private store: Store<{ evidences: { evidences: Evidence[] } }>
  ) {
    this.evidencesService.evidencesChanged$.subscribe(() => {
      this.evidences$ = this.evidencesService.evidences$;
      this.evidences$.subscribe((evs: Evidence[]) => {
        this.evidences = evs;
      });
    });
  }

  ngOnInit() {
    this.getEvidences();
  }

  getEvidences() {
    this.isLoading = true;
    this.evidencesService.getEvidences();
    this.evidencesService.evidences$.subscribe((evs: Evidence[]) => {
      setTimeout(() => {
        this.evidences = evs;
        this.isLoading = false;
      }, 1000);
    });
  }

  addEvidence() {
    this.isLoading = true;
    const ev: Evidence = {
      id: Math.floor(Math.random() * 100),
      name: this.generateString(),
      caseId: 1,
      dateAdded: new Date(),
    };
    this.evidencesService.addEvidence(ev).subscribe((e: Evidence) => {
      setTimeout(() => {
        console.log(e);
        this.isLoading = false;
      }, 1000);
    });
  }

  deleteEvidence(id: number) {
    this.isLoading = true;
    this.evidencesService.deleteEvidence(id).subscribe(() => {
      setTimeout(() => {
        console.log('deleted ', id);
        this.isLoading = false;
      }, 1000);
    });
  }

  generateString() {
    const length = 20;
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
