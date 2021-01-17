import { NgModule } from '@angular/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { SharedModule } from '@app/@shared';
import { CoreModule } from '@app/@core';
import { ClientsService } from './clients.service';
import { CaseModalComponent } from './edit-client/case-modal/case-modal.component';

@NgModule({
  imports: [SharedModule, ClientsRoutingModule],
  declarations: [ClientsComponent, EditClientComponent, CaseModalComponent],
  providers: [ClientsService, CoreModule],
})
export class ClientsModule {}
