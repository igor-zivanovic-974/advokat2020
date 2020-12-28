import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasesComponent } from './cases.component';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { Shell } from '@app/shell/shell.service';
import { extract } from '@app/i18n';

const routes: Routes = [
  Shell.childRoutes([
    // lazy loaded
    { path: '', component: CasesComponent, data: { title: extract('cases') } },
    { path: ':mode/:id', component: EditCaseComponent, data: { title: extract('case') } },
    { path: ':mode', component: EditCaseComponent, data: { title: extract('case') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class CasesRoutingModule {
  constructor() { }
}
