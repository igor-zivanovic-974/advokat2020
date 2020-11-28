import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { HelperService } from '@app/@core/services/helper.service';
import { Router, ActivatedRoute } from '@angular/router';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeesService } from '../employees.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Employee } from '@app/@core/interfaces/employee';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.scss'],
})
export class EditEmployeeComponent implements OnInit {
  employee: Employee = { id: null, firstName: '', lastName: '', roleId: null, role: '' }; // (null, '', null, null, '');
  id: number;
  mode: string;
  param = { value: 'world' };

  constructor(
    private translateService: TranslateService,
    // private helperService: HelperService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private employeesService: EmployeesService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.activatedRoute.params.subscribe((params: any) => {
      this.id = params.id as number;
      if (this.mode === 'new') {
        this.mode = 'new';
        this.spinner.hide();
      } else {
        this.mode = 'update';
        this.getEmployee(this.id);
        console.log(this.mode);
      }
    });
  }

  getEmployee(id: number) {
    this.employeesService.getEmployeeById(id).subscribe((data: Employee) => {
      this.employee = data;
      this.spinner.hide();
    });
  }

  goToUrl() {
    this.router.navigate(['employees']);
  }

  save() {
    this.spinner.show();
    if (this.mode === 'new') {
      this.employeesService.createEmployee(this.employee).subscribe((data: Employee) => {
        this.goToUrl();
      });
    } else {
      this.employeesService.updateEmployee(this.employee).subscribe((data: Employee) => {
        this.goToUrl();
      });
    }
  }

  resetForm(form: NgForm) {
    form.reset();
  }
}
