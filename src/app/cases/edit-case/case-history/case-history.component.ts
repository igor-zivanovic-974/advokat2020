import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CaseHistory } from '@app/@core/interfaces/caseHistory';
import { Mode } from '@app/@core/enums/mode';
import { ConfirmationModalComponent, DeleteModalComponent } from '@app/@shared';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-case-history',
  templateUrl: './case-history.component.html',
  styleUrls: ['./case-history.component.scss'],
})
export class CaseHistoryComponent implements OnInit {
  @Input() caseHistory: CaseHistory[];
  @Input() disabled: boolean;
  @Output() changeOccured: EventEmitter<boolean> = new EventEmitter();
  historyMode = Mode.preview;
  editHistoryId: number;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {}

  addHistory() {
    alert('Added history item');
    this.changeOccured.emit(true);
  }

  enableHistoryUpdate(row: number, historyItemId: number) {
    this.editHistoryId = historyItemId;
    const item: HTMLElement = document.getElementById('' + row + '2');
    this.historyMode = Mode.update;
    item.tabIndex = 0;
    item.contentEditable = 'true';
    item.focus();
    // alert('Enabled History update');
  }

  invokeUpdateHistory(row: number, historyItemId: number) {
    const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'xl' });
    modalRef.componentInstance.queryText = 'case.query-update'; // this.translateService.get();
    modalRef.componentInstance.confirm.subscribe((res: boolean) => {
      if (res) {
        this.updateHistory(row, historyItemId);
      } else {
        const item: HTMLElement = document.getElementById(row + '2');
        item.contentEditable = 'false';
        item.innerText = this.caseHistory[row].caseTitle;
        item.removeAttribute('tabindex');
        this.historyMode = Mode.preview;
        this.editHistoryId = null;
      }
    });
  }

  updateHistory(row: number, historyItemId: number) {
    const item: HTMLElement = document.getElementById(row + '2');
    item.contentEditable = 'false';
    item.removeAttribute('tabindex');
    this.historyMode = Mode.preview;
    this.editHistoryId = null;
    alert('History updated');
    this.changeOccured.emit(true);
  }

  invokeDeleteHistory(historyItemId: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, { size: 'xl' });
    modalRef.componentInstance.confirm.subscribe((res: boolean) => {
      if (res) {
        this.removeHistory(historyItemId);
      }
    });
  }

  removeHistory(historyId: number) {
    alert('History item removed');
    this.changeOccured.emit(true);
  }
}
