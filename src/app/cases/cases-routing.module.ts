import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesComponent } from './cases.component';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'cases', component: CasesComponent, data: { title: extract('cases') } },
    { path: 'cases/:mode/:id', component: EditCaseComponent, data: { title: extract('case') } },
    { path: 'cases/:mode', component: EditCaseComponent, data: { title: extract('case') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CasesRoutingModule {
  constructor() {}
}
