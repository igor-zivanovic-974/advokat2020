import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from '@app/@core';
import { ClientsService } from './clients.service';
import { CaseModalComponent } from './edit-client/case-modal/case-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    TranslateModule,
    ClientsRoutingModule,
    SimpleNotificationsModule,
    NgxSpinnerModule,
  ],
  declarations: [ClientsComponent, EditClientComponent, CaseModalComponent],
  providers: [ClientsService, CoreModule],
})
export class ClientsModule { }
