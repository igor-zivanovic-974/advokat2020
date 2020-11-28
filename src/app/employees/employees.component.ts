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

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];
  param = { value: 'world' };
  message = '';
  title = '';
  modalState: boolean;
  roles: Role[] = [];

  constructor(
    private translateService: TranslateService,
    private helperService: HelperService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService
  ) {}

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

  goToUrl(link: string) {
    this.router.navigate(['edit-employee/' + link]);
  }

  invokeDelete(id: number) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.confirm.subscribe((res: any) => {
      console.log('confirmed');
      this.delete(id);
    });
  }

  delete(id: number) {
    this.employeesService.deleteEmployee(id).subscribe((x: any) => {
      console.log('obrisano');
      this.getEmployees();
    });
  }
}
