import { Component, OnInit, HostListener, OnDestroy, Input } from '@angular/core';
import { CasesService } from '.././cases.service';
import { Case } from '@app/@core/interfaces/case';
// import { TranslateService } from '@ngx-translate/core';
// import { HelperService } from '@app/@core/services/helper.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Mode } from '@app/@core/enums/mode';
import { Council } from '@app/@core/interfaces/council';
import { ClientsModule } from '@app/clients/clients.module';
import { Client } from '@app/@core/interfaces/client';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationModalComponent } from '@app/@shared';
import { TranslateService } from '@ngx-translate/core';
import { Court, Employee, RegistrationMark } from '@app/@core';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { EditCaseService } from './edit-case.service';
import { SelectCourtTypeModalComponent } from './select-court-type-modal/select-court-type-modal.component';
import { Observable, Subject } from 'rxjs';
import { GlobalService } from '@app/shell/global.service';
import { take, takeUntil } from 'rxjs/operators';
import { NoteModalComponent } from '@app/@shared/modals/note-modal/note-modal.component';
import { Note } from '@app/@core/interfaces/note';
import { User } from '@app/@core/interfaces/user';
import { EmployeesService } from '@app/employees/employees.service';
import { NoteService } from '@app/@shared/modals/note-modal/note.service';
import { PaymentsComponent } from '@app/@shared/modals/payments/payments.component';

@Component({
  selector: 'app-edit-cases',
  templateUrl: './edit-case.component.html',
  styleUrls: ['./edit-case.component.scss'],
})
export class EditCaseComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  unsubscribe$ = new Subject<void>();
  respondent: Client;
  //  = {
  //   id: null,
  //   firstName: '',
  //   lastName: '',
  //   address: '',
  //   phone: '',
  //   pin: '',
  //   cases: [{ id: 1, name: 'Pera protiv Sime' }],
  // };
  prosecutor: Client;
  //  = {
  //   id: null,
  //   firstName: '',
  //   lastName: '',
  //   address: '',
  //   phone: '',
  //   pin: '',
  //   cases: [{ id: 2, name: 'Igor protiv Sime' }],
  // };
  client: Client;
  //  = {
  //   id: null,
  //   firstName: '',
  //   lastName: '',
  //   address: '',
  //   phone: '',
  //   pin: '',
  //   cases: [{ id: 3, name: 'Igor protiv Sime' }],
  // };
  case: Case;
  //  = {
  // id: null,
  // stateChanges: [],
  // internalMark: '',
  // dateCreated: new Date(),
  // dateUpdated: new Date(),
  // council: null,
  // clientId: null,
  // court: null,
  // registrationMark: null,
  // respondent: null,
  // prosecutor: null,
  // year: '',
  // caseNumber: '',
  // caseTitle: '',
  // subject: '',
  // caseValue: '',
  // notes: [],
  // files: [],
  // evidences: [],
  // hearingMinutes: [],
  // expertises: [],
  // decisions: [],
  // other: [],
  // status: null,
  // active: false,
  // caseHistory: [],
  // caseMovements: [],
  // payments: [],
  // };
  id: number;
  mode: string;
  @Input() modalId?: number;
  @Input() modalMode?: string;
  isMobileScreen$: Observable<boolean>;
  hasSideMenu$: Observable<boolean>;
  historyMode = 'preview';
  editHistoryId: number;
  disabled: boolean;
  councils: Council[] = [];
  registrationMarks: RegistrationMark[] = [];
  courtNames: KeyValuePair[] = [];
  courtTypes: KeyValuePair[];
  courtTypeId: number;
  prosecutorAdded = false;
  respondentAdded = false;
  statuses: KeyValuePair[];
  lastInternalMark: string;
  note: string;
  employees: Employee[];
  helpersDone$: Observable<boolean>;

  constructor(
    private casesService: CasesService,
    private ecService: EditCaseService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private _globalService: GlobalService,
    private employeesService: EmployeesService,
    private notesService: NoteService,
    private translateService: TranslateService
  ) {
    this.createForm();
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    this.hasSideMenu$ = this._globalService.hasSideMenu$;

    this.activatedRoute.params.subscribe((params: any) => {
      this.spinner.show();
      this.id = params.id ? params.id : this.modalId;
      this.mode = params.mode ? params.mode : null;
      this.disabled = !!(this.mode === 'preview');
      if (this.mode !== Mode.create && this.mode !== Mode.update && this.mode !== Mode.preview) {
        this.goToUrl('cases');
      }
      if (this.mode !== Mode.create) {
        this.getCase();
      } else {
        this.getCourtTypes();
        this.selectCourtType();
        this.form.patchValue({
          active: true,
          statusId: 1,
          files: [],
          decisions: [],
          expertises: [],
          evidences: [],
          hearingMinutes: [],
          other: [],
          caseHistory: [],
        });
      }
    });

    this.ecService.helpersDone$.subscribe(() => {
      this.councils = this.ecService.councils;
      this.courtNames = this.ecService.cns;
      this.courtTypes = this.ecService.cts;
      this.statuses = this.ecService.statusList;
      this.registrationMarks = this.ecService.rms;
    });
  }

  ngOnInit() {}

  selectCourtType() {
    const modalRef = this.modalService.open(SelectCourtTypeModalComponent, {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    });
    modalRef.componentInstance.options = this.courtTypes;
    modalRef.componentInstance.passEntry.subscribe((receivedEntry: number) => {
      this.courtTypeId = receivedEntry;
      this.case.active = true;
      this.getHelperData();
    });
  }

  getCase() {
    this.casesService.getCaseById(this.id).subscribe((data: Case) => {
      this.case = data;
      this.setClient(this.case.clientId);
      this.courtTypeId = data.court.courtTypeId;
      this.form.patchValue(data);
      this.form.patchValue({
        courtId: data.court.id,
        councilId: data.council.id,
        prosecutorName: data.prosecutor.firstName + ' ' + data.prosecutor.lastName,
        prosecutorAddress: data.prosecutor.address,
        respondentName: data.respondent.firstName + ' ' + data.respondent.lastName,
        respondentAddress: data.respondent.address,
        registrationMarkId: data.registrationMark.id,
        statusId: data.status.id,
      });
      // console.log('CASE: ', this.case);
      // console.log('FORM: ', this.form.value);
      this.getHelperData();
    });
  }

  getHelperData() {
    this.ecService.getHelperData();
    this.getEmployees();
    this.getLastInternalMark();
    // this.getCouncils();
    // this.getRegistrators();
    // this.getCourtNames();
    // this.getStatuses();
    this.spinner.hide();
  }

  getEmployees() {
    this.employeesService
      .getEmployees()
      .pipe(take(1))
      .subscribe((employees: Employee[]) => {
        this.employees = employees;
      });
  }

  getLastInternalMark() {
    if (this.mode === Mode.create) {
      this.casesService
        .getLastInternalMark()
        .pipe(take(1))
        .subscribe((lastItem: any) => {
          lastItem.last++;
          const lastMark = lastItem.last < 10 ? `0${lastItem.last}` : lastItem.last;
          this.lastInternalMark = lastMark + '/' + new Date().getFullYear();
          this.form.patchValue({ internalMark: this.lastInternalMark });
        });
    }
  }

  getCouncils() {
    this.ecService
      .getCouncils(this.courtTypeId)
      .pipe(take(1))
      .subscribe((councils: Council[]) => {
        this.councils = councils;
        // console.log('councils', this.councils);
      });
  }

  getRegistrators() {
    this.ecService
      .getRegistrationMarks(this.courtTypeId)
      .pipe(take(1))
      .subscribe((registrators: RegistrationMark[]) => {
        this.registrationMarks = registrators;
        // console.log(this.registrationMarks);
      });
  }

  getCourtNames() {
    this.ecService
      .getCourtNames(this.courtTypeId)
      .pipe(take(1))
      .subscribe((cNames: KeyValuePair[]) => {
        this.courtNames = cNames;
        // console.log(this.courtNames);
      });
  }

  getCourtTypes() {
    this.ecService
      .getCourtTypes()
      .pipe(take(1))
      .subscribe((cTypes: KeyValuePair[]) => {
        this.courtTypes = cTypes;
        // console.log('courtTypes: ', this.courtTypes);
      });
  }

  getStatuses() {
    this.ecService
      .getStatuses()
      .pipe(take(1))
      .subscribe((statuses: KeyValuePair[]) => {
        this.statuses = statuses;
        // console.log('Statuses: ', this.courtTypes);
      });
  }

  save() {
    this.spinner.show();
    if (this.mode === 'new') {
      this.formToCase();

      this.casesService
        .createCase(this.case)
        .pipe(take(1))
        .subscribe((data: Case) => {
          this.goToUrl(`cases/edit/${data.id}`);
        });
    } else {
      this.casesService
        .updateCase(this.form.value)
        .pipe(take(1))
        .subscribe((data: Case) => {
          this.goToUrl('cases');
        });
    }
    // console.log(this.form.value);
  }

  formToCase() {
    const court: Court = {
      id: this.form.value.courtId,
      name: this.courtNames.find((crt) => crt.id === this.form.value.courtId).name,
      courtTypeId: this.courtTypeId,
      courtTypeName: this.courtTypes.find((ct) => ct.id === this.courtTypeId).name,
    };
    this.case = {
      id: null,
      stateChanges: [],
      internalMark: this.form.value.internalMark,
      dateCreated: new Date(),
      dateUpdated: new Date(),
      clientId: this.form.value.clientId,
      // tslint:disable-next-line:object-literal-shorthand
      court: court,
      council: this.councils.find((c) => c.id === this.form.value.councilId),
      registrationMark: this.registrationMarks.find((rm) => rm.id === this.form.value.registrationMarkId),
      caseNumber: this.form.value.caseNumber,
      year: this.form.value.year,
      caseTitle: this.form.value.caseTitle,
      subject: this.form.value.subject,
      prosecutor: this.prosecutor,
      respondent: this.respondent,
      caseValue: this.form.value.caseValue,
      notes: this.form.value.notes,
      status: this.statuses.find((s) => s.id === this.form.value.statusId),
      active: true,
      files: [],
      decisions: [],
      evidences: [],
      expertises: [],
      hearingMinutes: [],
      other: [],
      caseHistory: [],
    };

    // console.log(this.case);
  }

  goToUrl(url: string) {
    this.router.navigate([url]);
  }

  setClient(id: number) {
    // debugger
    this.case.clientId = id;
    this.form.value.clientId = id;
    if (id === +this.case.prosecutor.id) {
      this.prosecutorAdded = true;
      this.respondentAdded = false;
    } else {
      this.respondentAdded = true;
      this.prosecutorAdded = false;
    }
  }

  switchCase(state: string) {
    alert(state);
  }

  // openNoteModal(noteId?: number) {
  //   const modalRef = this.modalService.open(NoteComponent, { size: 'xl' });
  //   modalRef.componentInstance.caseId = this.case.id;
  //   if (noteId) {
  //     modalRef.componentInstance.noteToEdit = this.case.notes.find((n) => n.id === noteId);
  //   }
  //   modalRef.componentInstance.note.subscribe((receivedEntry: Note) => {
  //     this.case.notes.push(receivedEntry);
  //     this.getHelperData();
  //   });
  // }

  // invokeDeleteNote(noteId: number) {
  //   const modalRef = this.modalService.open(ConfirmationModalComponent, { size: 'xl' });
  //   modalRef.componentInstance.id = noteId;
  //   modalRef.componentInstance.queryText = 'common.delete-note-query';
  //   modalRef.componentInstance.confirm.subscribe((response: boolean) => {
  //     if (response) {
  //       this.deleteNote(noteId);
  //     }
  //   });
  // }

  // deleteNote(noteId: number) {
  //   this.notesService
  //     .deleteNote(noteId)
  //     .pipe(take(1))
  //     .subscribe((note: Note) => {
  //       const index = this.case.notes.indexOf(note);
  //       if (index) {
  //         this.case.notes.splice(index, 1);
  //       }
  //     });
  // }

  openPaymentsModal() {
    const modalRef = this.modalService.open(PaymentsComponent, { size: 'xl' });
    modalRef.componentInstance.payments = this.case.payments;
    // modalRef.componentInstance.queryText = 'common.delete-note-query';
    // modalRef.componentInstance.confirm.subscribe((response: boolean) => {
    //   if (response) {
    //     this.deleteNote(noteId);
    //   }
    // });
  }

  addParty(party: string) {
    const partySide = party === 'prosecutor' ? 'prosecutor' : 'respondent';
    const p: Client = this.openPartyModal('new');
    if (partySide === 'prosecutor') {
      this.prosecutor = p;
      this.prosecutorAdded = true;
      this.form.patchValue({ prosecutorName: `${p.firstName} ${p.lastName}`, prosecutorAddress: p.address });
    } else {
      this.respondent = p;
      this.respondentAdded = true;
      this.form.patchValue({ respondentName: `${p.firstName} ${p.lastName}`, respondentAddress: p.address });
    }
  }

  editParty(party: string) {
    let pId: number;
    const partySide = party === 'prosecutor' ? 'prosecutor' : 'respondent';
    if (party === 'prosecutor') {
      pId = this.mode === 'new' ? this.prosecutor.id : this.case.prosecutor.id;
    } else {
      pId = this.mode === 'new' ? this.respondent.id : this.case.respondent.id;
    }

    const p = this.openPartyModal('edit', pId);
    if (partySide === 'prosecutor') {
      this.prosecutorAdded = true;
      this.form.patchValue({ prosecutorName: `${p.firstName} ${p.lastName}`, prosecutorAddress: p.address });
    } else {
      this.respondentAdded = true;
      this.form.patchValue({ respondentName: `${p.firstName} ${p.lastName}`, respondentAddress: p.address });
    }
  }

  openPartyModal(mode: string, pId?: number) {
    if (mode === 'edit' && pId) {
      return {
        id: 1,
        firstName: 'Pera',
        lastName: 'Peric',
        address: 'Adresa 1',
        phone: '21323213',
        pin: '321323',
        cases: [{ id: 3, name: 'Igor protiv Sime' }],
      };
    } else {
      return {
        id: 2,
        firstName: 'Sima',
        lastName: 'Simic',
        address: 'Adresa 2',
        phone: '21323213',
        pin: '321323',
        cases: [{ id: 3, name: 'Igor protiv Sime' }],
      };
    }
  }

  changeDetected() {
    this.getCase();
  }

  onChangeCourt(courtId: number) {
    this.form.value.courtId = courtId;
    // console.log('FORM', this.form.value);
  }

  onChangeCouncil(councilId: number) {
    this.form.value.councilId = councilId;
    // console.log('FORM', this.form.value);
  }

  createForm() {
    this.form = this.formBuilder.group({
      internalMark: ['', Validators.required],
      councilId: [null, Validators.required],
      registrationMarkId: [null],
      caseNumber: ['', Validators.required],
      year: ['', Validators.required],
      courtId: [null, Validators.required],
      caseTitle: ['', Validators.required],
      notes: [this.formBuilder.array([])],
      respondentName: [null, Validators.required],
      respondentAddress: ['', Validators.required],
      prosecutorName: [null, Validators.required],
      prosecutorAddress: ['', Validators.required],
      subject: ['', Validators.required],
      files: [this.formBuilder.array([])],
      evidences: [this.formBuilder.array([])],
      decisions: [this.formBuilder.array([])],
      hearingMinutes: [this.formBuilder.array([])],
      expertises: [this.formBuilder.array([])],
      other: [this.formBuilder.array([])],
      statusId: ['', Validators.required],
      active: ['', Validators.required],
      caseValue: ['', Validators.required],
      caseHistory: [this.formBuilder.array([])],
    });
  }

  printForm() {
    console.log(this.form.value);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
