import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { I18nModule } from '@app/i18n';
import { AuthModule } from '@app/auth';
import { ShellComponent } from './shell.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { GlobalService } from './global.service';

@NgModule({
  imports: [CommonModule, TranslateModule, NgbModule, AuthModule, I18nModule, RouterModule],
  declarations: [HeaderComponent, ShellComponent, SideMenuComponent, FooterComponent],
  providers: [GlobalService],
})
export class ShellModule {}
