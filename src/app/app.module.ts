import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// import { EvidencesModule } from './evidences/evidences.module';
// import { ClientsModule } from './clients/clients.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from './messages/messages.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NotifierModule } from 'angular-notifier';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { evidencesReducer } from './evidences/store/evidences.reducer';
// import { WebSocket, Server } from 'mock-socket';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    NgbModule,
    NgbModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    // lazy loaded feature modules
    // CasesModule,
    // EmployeesModule,
    // LoginModule
    // EvidencesModule,
    // ClientsModule,
    MessagesModule,
    NgxFileDropModule,
    StoreModule.forRoot({ evidences: evidencesReducer }),
    StoreDevtoolsModule.instrument(),
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12,
        },
        vertical: {
          position: 'bottom',
          distance: 12,
          gap: 10,
        },
      },
      theme: 'material',
      behaviour: {
        autoHide: 5000,
        onClick: false,
        onMouseover: 'pauseAutoHide',
        showDismissButton: true,
        stacking: 4,
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50,
        },
        shift: {
          speed: 300,
          easing: 'ease',
        },
        overlap: 150,
      },
    }),
    // WebSocket,
    // Server,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule { }
