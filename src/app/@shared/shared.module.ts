import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NotificationsService } from '@app/@shared/services/notifications.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { NoteComponent } from './modals/note/note.component';
import { PaymentsComponent } from './modals/payments/payments.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxFileDropModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    SimpleNotificationsModule,
    NgSelectModule,
    NgxSpinnerModule,
    // BrowserAnimationsModule
  ],
  declarations: [
    LoaderComponent,
    DeleteModalComponent,
    ConfirmationModalComponent,
    ContextMenuComponent,
    FileUploadComponent,
    DropdownComponent,
    NoteComponent,
    PaymentsComponent,
    DropdownComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgSelectModule,
    SimpleNotificationsModule,
    TranslateModule,
    NgxSpinnerModule,
    LoaderComponent,
    DeleteModalComponent,
    ConfirmationModalComponent,
    NoteComponent,
    FileUploadComponent,
    PaymentsComponent,
    DropdownComponent,
  ],
  entryComponents: [
    DeleteModalComponent,
    ConfirmationModalComponent,
    FileUploadComponent,
    NoteComponent,
    PaymentsComponent,
    DropdownComponent,
    BrowserAnimationsModule
  ],
  providers: [NotificationsService],
})
export class SharedModule { }

// platformBrowserDynamic().bootstrapModule(SharedModule);
