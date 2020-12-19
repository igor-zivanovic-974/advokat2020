import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  @Input() modalState = false;
  @Input() queryText?: string;
  @Output() confirm: EventEmitter<boolean> = new EventEmitter<boolean>();
  deleteConfirm = false;

  constructor(public activeModal: NgbActiveModal, private translate: TranslateService) {}

  ngOnInit() {}

  isIn(): boolean {
    return this.modalState;
  }

  setConfirm() {
    this.confirm.emit(true);
    this.activeModal.close();
  }

  setCancel() {
    this.confirm.emit(false);
    this.activeModal.close();
  }
}
