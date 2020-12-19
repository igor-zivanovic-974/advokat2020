import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Employee } from '@app/@core/interfaces/employee';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { EmployeesService } from './employees.service';
import { Role } from '@app/@core/interfaces/role';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/shell/global.service';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  searchValue = '';
  filteredEmployees: Employee[] = [];
  message = '';
  title = '';
  modalState: boolean;
  roles: Role[] = [];
  isMobileScreen$: Observable<boolean>;
  selectedEmployee: Employee;
  selectedEmployeeId: number;
  link = 'employees';
  errorMessage: any;

  constructor(
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

  }

  getEmployees() {
    this.employeesService.getEmployees().subscribe((data: Employee[]) => {
      this.employees = data;
      this.filteredEmployees = data;
      this.spinner.hide();
    });
  }

  setActiveEmployee(employee: Employee) {
    this.selectedEmployee = employee;
  }

  searchEmployees() {
    setTimeout(() => {
      this.searchValue = this.searchValue.trim();
      if (this.searchValue === '') {
        this.filteredEmployees = [...this.employees];
        return;
      }
      this.filteredEmployees = this.employees.filter((e) => {
        return (
          e.firstName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          e.lastName.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          e.phone.includes(this.searchValue) ||
          e.address.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      });
    }, 500);

    console.log(this.filteredEmployees);
  }

  goToUrl(mode: string, employeeId?: number) {
    const baseUrl = `employees/${mode}`;
    const url = mode === 'new' ? baseUrl : `${baseUrl}/${employeeId}`;
    this.router.navigate([url]);
    // if (mode !== 'new') {
    // const modalRef = this.modalService.open(EditEmployeeComponent, { size: 'xl' });
    // modalRef.componentInstance.mode = mode;
    // modalRef.componentInstance.id = employeeId;
    //   this.router.navigate([`employees/${mode}`]);
    // } else {
    //   this.router.navigate([`employees/${mode}`]);
    // }
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
