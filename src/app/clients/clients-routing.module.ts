import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/i18n';
import { ClientsComponent } from './clients.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { Shell } from '@app/shell/shell.service';

const routes: Routes = [
  Shell.childRoutes([
    { path: 'clients', component: ClientsComponent, data: { title: extract('Klijenti') } },
    // { path: 'edit-client/new', component: EditClientComponent, data: { title: extract('Klijent') } },
    { path: 'clients/:mode/:id', component: EditClientComponent, data: { title: extract('Klijent') } },
    { path: 'clients/:mode', component: EditClientComponent, data: { title: extract('Klijent') } },
  ]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ClientsRoutingModule {}
