import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { extract } from '@app/i18n';
import { Shell } from '@app/shell/shell.service';
import { MessagesComponent } from './messages.component';

const routes: Routes = [
  Shell.childRoutes([{ path: 'messages', component: MessagesComponent, data: { title: extract('Messages') } }]),
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesRoutingModule {}
