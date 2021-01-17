import { NgModule } from '@angular/core';

import { AboutRoutingModule } from './about-routing.module';
import { AboutComponent } from './about.component';
import { SharedModule } from '@app/@shared';

@NgModule({
  imports: [SharedModule, AboutRoutingModule],
  declarations: [AboutComponent],
})
export class AboutModule {}
