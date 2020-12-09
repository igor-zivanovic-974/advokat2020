import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/@shared/shared.module';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeesService } from './employees.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from '@app/@core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    SimpleNotificationsModule,
    NgxSpinnerModule,
    NgSelectModule,
    EmployeesRoutingModule,
  ],
  declarations: [EmployeesComponent, EditEmployeeComponent],
  providers: [EmployeesService, CoreModule],
})
export class EmployeesModule { }
