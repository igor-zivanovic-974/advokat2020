import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '@app/@shared';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CoreModule } from '@app/@core';
import { ClientsService } from './clients.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    TranslateModule,
    ClientsRoutingModule,
    SimpleNotificationsModule,
    NgxSpinnerModule,
  ],
  declarations: [ClientsComponent, EditClientComponent],
  providers: [ClientsService, CoreModule],
})
export class ClientsModule {}
