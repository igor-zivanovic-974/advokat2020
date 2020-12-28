import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { EvidencesComponent } from './evidences.component';
import { EditEvidenceComponent } from './edit-evidence/edit-evidence.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  // eagerly loaded, not lazy loaded
  // TODO make it lazy loaded
  Shell.childRoutes([
    { path: 'evidences', component: EvidencesComponent, data: { title: extract('evidences') } },
    { path: 'evidences/edit/:id', component: EditEvidenceComponent, data: { title: extract('evidence') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EvidencesRoutingModule { }
