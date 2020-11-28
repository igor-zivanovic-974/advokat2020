import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidencesRoutingModule } from './evidences-routing.module';
import { EvidencesComponent } from './evidences.component';
import { EditEvidenceComponent } from './edit-evidence/edit-evidence.component';

@NgModule({
  declarations: [EvidencesComponent, EditEvidenceComponent],
  imports: [CommonModule, EvidencesRoutingModule],
})
export class EvidencesModule {}
