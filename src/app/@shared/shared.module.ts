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
import { NoteModalComponent } from './modals/note-modal/note-modal.component';
import { PaymentsComponent } from './modals/payments/payments.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PasswordLengthDetectorDirective } from './directives/password-length-detector.directive';
import { HighlightFieldDirective } from './directives/highlight-field.directive';
import { TestDirective } from './directives/test.directive';
import { HighlightDirective } from './directives/highlight.directive';

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
    NoteModalComponent,
    PaymentsComponent,
    DropdownComponent,
    PasswordLengthDetectorDirective,
    HighlightFieldDirective,
    TestDirective,
    HighlightDirective,
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
    NoteModalComponent,
    FileUploadComponent,
    PaymentsComponent,
    DropdownComponent,
    PasswordLengthDetectorDirective,
    HighlightFieldDirective,
    TestDirective,
    HighlightDirective,
  ],
  entryComponents: [
    DeleteModalComponent,
    ConfirmationModalComponent,
    FileUploadComponent,
    NoteModalComponent,
    PaymentsComponent,
    DropdownComponent,
    BrowserAnimationsModule
  ],
  providers: [NotificationsService],
})
export class SharedModule { }

// platformBrowserDynamic().bootstrapModule(SharedModule);
