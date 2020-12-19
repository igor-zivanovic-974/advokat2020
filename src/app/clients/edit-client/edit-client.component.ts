import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../clients.service';
import { Client } from '@app/@core/interfaces/client';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
// import { HelperService } from '@app/@core/services/helper.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Mode } from '@app/@core/enums/mode';
import { Observable, Subject } from 'rxjs';
import { GlobalService } from '@app/shell/global.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CaseModalComponent } from './case-modal/case-modal.component';
import { Case } from '@app/@core';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { DeleteModalComponent } from '@app/@shared';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.scss'],
})
export class EditClientComponent implements OnInit {
  client: Client = {
    id: null,
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    pin: '',
    cases: [],
  };
  id: number;
  mode: string;
  form!: FormGroup;
  // unsubscribe$ = new Subject<void>();
  respondent: Client = {
    id: null,
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    pin: '',
    cases: [{ id: 1, name: '' }],
  };
  prosecutor: Client = {
    id: null,
    firstName: '',
    lastName: '',
    address: '',
    phone: '',
    pin: '',
    cases: [{ id: 2, name: '' }],
  };
  isMobileScreen$: Observable<boolean>;
  selectedIds: number[] = [];

  constructor(
    private clientsService: ClientsService,
    private translateService: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService // private helperService: HelperService
  ) {
    this.createForm();
    this.isMobileScreen$ = this._globalService.isMobileScreen$;

    this.activatedRoute.params.subscribe((params: any) => {
      this.spinner.show();
      this.id = params.id ? +params.id : null;
      this.mode = params.mode ? params.mode : null;

      if (this.mode !== Mode.create && this.mode !== Mode.update) {
        this.goToUrl('clients');
      }

      if (this.mode === Mode.create) {
        this.spinner.hide();
      } else {
        this.getClient(this.id);
      }
    });
  }

  ngOnInit() {}

  getClient(id: number) {
    this.clientsService.getClientById(id).subscribe((data: Client) => {
      this.client = data;
      this.setCaseIds();
      // console.log('CLIENT', this.client);
      this.form.patchValue(data);
      // console.log('POCETNA FORMA:', this.form.value);
      this.spinner.hide();
    });
  }

  goToUrl(link: string) {
    this.router.navigate([link]);
  }

  save() {
    this.spinner.show();
    if (this.mode === 'new') {
      this.clientsService.createClient(this.form.value).subscribe((data: Client) => {
        this.goToUrl('clients');
      });
    } else {
      this.clientsService.updateClient(this.form.value).subscribe((data: Client) => {
        this.goToUrl('clients');
      });
    }
  }

  invokeDeleteCase(caseId: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.confirm.subscribe((res: any) => {
      // console.log('confirmed for deletion');
      if (res) {
        this.deleteCase(caseId);
      }
    });
  }

  deleteCase(id: number) {
    const c = this.client.cases.find((el) => el.id === id);
    const index = this.client.cases.indexOf(c);

    if (index > -1) {
      this.client.cases.splice(index, 1);
    }
    this.form.patchValue({ cases: this.client.cases });
    // console.log(this.client);
    // console.log(this.form.value);
  }

  addCase() {
    const modalRef = this.modalService.open(CaseModalComponent, { size: 'lg' });
    modalRef.componentInstance.selectedIds = this.selectedIds;
    modalRef.componentInstance.selectedCasesIds.subscribe((cases: KeyValuePair[]) => {
      this.client.cases = cases;
      this.form.patchValue({ cases: cases });
      this.selectedIds = [];
      this.setCaseIds();
      // console.log(this.form.value);
    });
  }

  setCaseIds() {
    this.client.cases.forEach((c) => {
      this.selectedIds.push(c.id);
    });
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: null,
      firstName: ['', Validators.required],
      lastName: [null, Validators.required],
      address: [null],
      phone: ['', Validators.required],
      pin: ['', Validators.required],
      cases: [this.formBuilder.array([])],
    });
  }

  printForm() {
    console.log(this.form.value);
  }
}
