import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/@shared/shared.module';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeesService } from './employees.service';

@NgModule({
  imports: [SharedModule, EmployeesRoutingModule],
  declarations: [EmployeesComponent, EditEmployeeComponent],
  providers: [EmployeesService],
})
export class EmployeesModule {}
