import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from '@app/@core/services/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from '../employees.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee } from '@app/@core/interfaces/employee';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Mode } from '@app/@core/enums/mode';
import { GlobalService } from '@app/shell/global.service';
import { Observable } from 'rxjs';
import { DeleteModalComponent } from '@app/@shared';
import { CaseModalComponent } from '@app/clients/edit-client/case-modal/case-modal.component';
import { KeyValuePair } from '@app/@core/interfaces/keyValuePair';
import { Case, Role } from '@app/@core';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = {
    id: null,
    firstName: '',
    lastName: '',
    phone: '063/ 331030',
    address: 'Radoja Dakica 12, Zemun',
    role: { id: null, name: '' },
    cases: [],
  }; // (null, '', null, null, '');
  id: number;
  mode: string;
  form!: FormGroup;
  isMobileScreen$: Observable<boolean>;
  selectedIds: number[] = [];
  roles: Role[] = [];

  constructor(
    private translateService: TranslateService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _globalService: GlobalService,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService
  ) {
    this.createForm();
    this.getRoles();
    this.spinner.show();
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id ? params.id : null;
      this.mode = params.mode ? params.mode : null;

      if (this.mode !== Mode.create && this.mode !== Mode.update) {
        this.goToUrl('employees');
      }

      if (this.mode === 'new') {
        this.spinner.hide();
      } else {
        this.getEmployee(this.id);
      }
    });
  }

  ngOnInit() { }

  getEmployee(id: number) {
    this.employeesService.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
      this.setCaseIds();
      console.log('EMPLOYEE', this.employee);
      this.form.patchValue(data);
      this.form.patchValue({ roleId: data.role.id });
      console.log('POCETNA FORMA:', this.form.value);
      this.spinner.hide();
    });
  }

  getRoles() {
    this.employeesService.getRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      // console.log('ROLES', this.roles);
    });
  }

  setRole(roleId: any) {
    const r = this.roles.find((x) => x.id === +roleId);
    this.form.patchValue({ role: r });
    // console.log(this.form.value.role);
  }

  goToUrl(link: string) {
    this.router.navigate([link]);
  }

  save() {
    this.spinner.show();
    // const r = this.roles.find(x => x.id === this.form.value.roleId);
    // this.form.patchValue({ role: r });
    if (this.mode === 'new') {
      this.employeesService.createEmployee(this.form.value).subscribe((data: Employee) => {
        this.goToUrl('employees');
      });
    } else {
      this.employeesService.updateEmployee(this.form.value).subscribe((data: Employee) => {
        this.goToUrl('employees');
      });
    }
  }

  invokeDeleteCase(caseId: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.confirm.subscribe((res: any) => {
      if (res) {
        this.deleteCase(caseId);
      }
    });
  }

  deleteCase(id: number) {
    const c = this.employee.cases.find((el) => el.id === id);
    const index = this.employee.cases.indexOf(c);

    if (index > -1) {
      this.employee.cases.splice(index, 1);
    }
    this.form.patchValue({ cases: this.employee.cases });
    // console.log(this.client);
    // console.log(this.form.value);
  }

  addCase() {
    const modalRef = this.modalService.open(CaseModalComponent, { size: 'lg' });
    modalRef.componentInstance.selectedIds = this.selectedIds;
    modalRef.componentInstance.fromEmployeesPage = true;
    modalRef.componentInstance.selectedCases.subscribe((cases: Case[]) => {
      this.employee.cases = cases;
      this.form.patchValue({ 'cases': cases });
      this.selectedIds = [];
      this.setCaseIds();
      // console.log(this.form.value);
    });
  }

  setCaseIds() {
    this.employee.cases.forEach((c) => {
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
      roleId: [null, Validators.required],
      role: null,
      cases: [this.formBuilder.array([])],
    });
  }

  printForm() {
    console.log(this.form.value);
  }
}
