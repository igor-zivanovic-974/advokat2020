import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'employees', component: EmployeesComponent, data: { title: extract('Zaposleni') } },
    { path: 'edit-employee/:id', component: EditEmployeeComponent, data: { title: extract('Zaposleni') } },
    // { path: 'edit-employee/new', component: EditEmployeeComponent, data: { title: extract('Zaposleni') } }
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EmployeesRoutingModule {}
