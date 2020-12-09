import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CasesModule } from './cases/cases.module';
import { EmployeesModule } from './employees/employees.module';
import { EvidencesModule } from './evidences/evidences.module';
import { ClientsModule } from './clients/clients.module';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessagesModule } from './messages/messages.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NotifierModule } from 'angular-notifier';
// import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgSelectModule } from '@ng-select/ng-select';
import { StoreModule } from '@ngrx/store';
import { employeeReducer } from './store/reducers/employees.reducers';
import { EffectsModule } from '@ngrx/effects';
import { EmployeeEffects } from './store/effects/employees.effects';
import { StoreDevtools, StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    SimpleNotificationsModule.forRoot(),
    NgbModule,
    NgxSpinnerModule,
    NgbModule,
    NgSelectModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AboutModule,
    CasesModule,
    EmployeesModule,
    EvidencesModule,
    ClientsModule,
    MessagesModule,
    NgxFileDropModule,
    StoreModule.forRoot({ employees: employeeReducer }),
    EffectsModule.forRoot([EmployeeEffects]),
    StoreDevtoolsModule.instrument(),
    // PdfViewerModule,
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
    AuthModule,
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [NgbActiveModal],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
