import { Component, OnInit } from '@angular/core';
import { Employee } from '@app/@core/interfaces/employee';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { EmployeesService } from './employees.service';
import { HelperService } from '@app/@core/services/helper.service';
import { Role } from '@app/@core/interfaces/role';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/shell/global.service';
import { EditCaseComponent } from '@app/cases/edit-case/edit-case.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  filter = '';
  message = '';
  title = '';
  modalState: boolean;
  roles: Role[] = [];
  isMobileScreen$: Observable<boolean>;
  selectedEmployee: Employee;
  selectedEmployeeId: number;
  link = 'employees';

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService,
    private _globalService: GlobalService
  ) {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
  }

  ngOnInit() {
    this.spinner.show();
    this.getEmployees();
    // this.roles = this.helperService.getRoles();
  }

  getEmployees() {
    this.employeesService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      // this.employees.forEach((x) => (x.role = this.helperService.getRole(Number(x.id))));
      this.spinner.hide();
    });
  }

  setActiveEmployee(employeeId: number) {
    this.selectedEmployeeId = employeeId;
    this.selectedEmployee = this.employees.find((c) => c.id === employeeId);
    console.log(this.selectedEmployee);
  }

  searchEmployees() {
    setTimeout(() => {
      this.filteredEmployees = this.employees.filter(e => {
        return e.firstName.toLowerCase().includes(this.filter.toLowerCase()) || e.lastName.toLowerCase().includes(this.filter.toLowerCase()) || e.phone.includes(this.filter) || e.address.includes(this.filter.toLowerCase());
      });
    }, 500);
  }

  goToUrl(mode: string, employeeId?: number) {
    if (mode !== 'new') {
      // this.router.navigate([`cases/${mode}/${empoyeeId}`]);
      const modalRef = this.modalService.open(EditCaseComponent, { size: 'xl' });
      modalRef.componentInstance.mode = mode;
      modalRef.componentInstance.id = employeeId;
    } else {
      this.router.navigate([`cases/${mode}`]);
    }
  }

  invokeDeleteEmployee(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.confirm.subscribe((res: any) => {
      console.log('confirmed');
      this.deleteEmployee(id);
    });
  }

  deleteEmployee(id: number) {
    this.employeesService.deleteEmployee(id).subscribe((x: any) => {
      console.log('obrisano');
      this.getEmployees();
    });
  }
}
