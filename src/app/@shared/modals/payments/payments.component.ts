import { Component, Input, OnInit } from '@angular/core';
import { CasePayment } from '@app/@core/interfaces/casePayment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  @Input() payments: CasePayment[];

  constructor() { }

  ngOnInit(): void {
  }

  print() { }
}
