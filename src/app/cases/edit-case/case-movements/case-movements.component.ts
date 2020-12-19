import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseMovement } from '@app/@core/interfaces/caseMovement';

@Component({
  selector: 'app-case-movements',
  templateUrl: './case-movements.component.html',
  styleUrls: ['./case-movements.component.scss'],
})
export class CaseMovementsComponent implements OnInit {
  @Input() caseMovements: CaseMovement[];
  @Output() relatedCaseId: EventEmitter<number> = new EventEmitter<number>();
  constructor() {}

  ngOnInit(): void {}

  openRelatedCase(id: number) {
    this.relatedCaseId.emit(id);
  }
}
