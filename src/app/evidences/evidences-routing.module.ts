import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { EvidencesComponent } from './evidences.component';
import { EditEvidenceComponent } from './edit-evidence/edit-evidence.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'evidences', component: EvidencesComponent, data: { title: extract('Dokazi') } },
    { path: 'edit-evidence', component: EditEvidenceComponent, data: { title: extract('Dokaz') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class EvidencesRoutingModule {}
