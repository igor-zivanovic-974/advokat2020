import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';
import { AuthenticationGuard } from '@app/@core/auth';

const routes: Routes = [
  Shell.childRoutes([
    // lazy loaded
    { path: '', component: EmployeesComponent, data: { title: extract('employees') }, canActivate: [AuthenticationGuard] },
    { path: ':mode/:id', component: EditEmployeeComponent, data: { title: extract('employee') }, canActivate: [AuthenticationGuard] },
    { path: ':mode', component: EditEmployeeComponent, data: { title: extract('employee') }, canActivate: [AuthenticationGuard] },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EmployeesRoutingModule { }
