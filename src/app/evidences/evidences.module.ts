import { NgModule } from '@angular/core';
import { EvidencesRoutingModule } from './evidences-routing.module';
import { EvidencesComponent } from './evidences.component';
import { EditEvidenceComponent } from './edit-evidence/edit-evidence.component';
import { SharedModule } from '@app/@shared';

@NgModule({
  declarations: [EvidencesComponent, EditEvidenceComponent],
  imports: [SharedModule, EvidencesRoutingModule],
})
export class EvidencesModule { }
