import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
// import { AuthModule } from '@app/@core/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GlobalService } from './global.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { WebsocketService } from '@app/@core/services/websocket.service';
import { ChatService } from '@app/@core/services/chat.service';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, I18nModule, SimpleNotificationsModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent, SideMenuComponent, FooterComponent],
  providers: [GlobalService, WebsocketService, ChatService],
})
export class ShellModule { }
