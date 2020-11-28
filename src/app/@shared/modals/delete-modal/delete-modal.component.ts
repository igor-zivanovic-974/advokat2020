import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  @Input() modalState = false;
  @Input() deleteText?: string;
  @Output() confirm = new EventEmitter<boolean>();
  deleteConfirm = false;

  constructor(public activeModal: NgbActiveModal) {}

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
