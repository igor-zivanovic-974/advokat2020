import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { SharedModule } from '@app/@shared';
import { I18nModule } from '@app/i18n';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedModule, I18nModule, LoginRoutingModule],
})
export class LoginModule {}
