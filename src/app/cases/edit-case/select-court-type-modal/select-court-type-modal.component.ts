import { Component, EventEmitter, Input, OnInit, Output, ViewChild, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-select-court-type-modal',
  templateUrl: './select-court-type-modal.component.html',
  styleUrls: ['./select-court-type-modal.component.scss'],
})
export class SelectCourtTypeModalComponent implements OnInit {
  @Input() options: KeyValuePair[];
  @Output() passEntry: EventEmitter<number> = new EventEmitter();
  activeItem: number;

  constructor(public activeModal: NgbActiveModal, private router: Router) {}

  ngOnInit(): void {}

  setActiveItem(id: number) {
    this.activeItem = id;
  }

  selectCourtType() {
    this.passEntry.emit(this.activeItem);
    this.activeModal.close();
  }

  goBack() {
    this.router.navigate(['cases']);
    this.activeModal.close();
  }
}
