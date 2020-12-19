import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Case } from '@app/@core';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { CasesService } from '@app/cases/cases.service';
import { GlobalService } from '@app/shell/global.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-case-modal',
  templateUrl: './case-modal.component.html',
  styleUrls: ['./case-modal.component.scss'],
})
export class CaseModalComponent implements OnInit {
  @Input() selectedIds: number[];
  @Input() fromEmployeesPage?: boolean;
  cases: Case[] = [];
  filteredCases: Case[] = [];
  chosenCases: Case[] = [];
  filter = '';
  caseIdsList: number[] = [];
  caseList: KeyValuePair[] = [];
  isMobileScreen$: Observable<boolean>;
  @Output() selectedCasesIds: EventEmitter<KeyValuePair[]> = new EventEmitter<KeyValuePair[]>();
  @Output() selectedCases: EventEmitter<Case[]> = new EventEmitter<Case[]>();

  constructor(
    private casesService: CasesService,
    private spinner: NgxSpinnerService,
    private activeModal: NgbActiveModal,
    private _globalService: GlobalService
  ) {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.caseIdsList = [...this.selectedIds];
    this.getCases();
  }

  getCases() {
    this.casesService.getCases().subscribe((data: Case[]) => {
      this.cases = data;
      this.filteredCases = data;
      // console.log('CASES: ', this.cases);
      this.spinner.hide();
    });
  }

  searchCases() {
    setTimeout(() => {
      setTimeout(() => {
        this.filteredCases = this.cases.filter((c) => {
          return c.subject.toLowerCase().includes(this.filter.toLowerCase());
        });
      }, 500);
    });
  }

  addActiveCase(caseId: number) {
    const index = this.caseIdsList.indexOf(caseId);
    if (index > -1) {
      this.caseIdsList.splice(index, 1);
    } else {
      this.caseIdsList.push(caseId);
    }
  }

  cancel() {
    this.activeModal.close();
  }

  save() {
    this.caseIdsList.forEach((element) => {
      const c = this.cases.find((x) => x.id === element);
      if (!this.fromEmployeesPage) {
        this.caseList.push({ id: c.id, name: c.subject });
      } else {
        this.chosenCases.push(c);
      }
    });

    if (!this.fromEmployeesPage) {
      this.selectedCasesIds.emit(this.caseList);
    } else {
      this.selectedCases.emit(this.chosenCases);
    }
    this.activeModal.close();
  }
}
