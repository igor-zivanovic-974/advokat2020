import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader/loader.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';

import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { NotificationsService } from '@app/@shared/services/notifications.service';
import { PdfViewerModule } from 'ng2-pdf-viewer';
// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { DropdownComponent } from './dropdown/dropdown.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ConfirmationModalComponent } from './modals/confirmation-modal/confirmation-modal.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    NgbModalModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    NgxFileDropModule,
    PdfViewerModule,
    NgxExtendedPdfViewerModule,
    SimpleNotificationsModule,
    NgSelectModule,
  ],
  declarations: [
    LoaderComponent,
    DeleteModalComponent,
    ConfirmationModalComponent,
    ContextMenuComponent,
    FileUploadComponent,
    DropdownComponent,
    NoteComponent,
  ],
  exports: [LoaderComponent, DeleteModalComponent, ConfirmationModalComponent, NoteComponent, TranslateModule, FileUploadComponent],
  entryComponents: [DeleteModalComponent, ConfirmationModalComponent, FileUploadComponent, NoteComponent],
  providers: [NotificationsService],
})
export class SharedModule { }

// platformBrowserDynamic().bootstrapModule(SharedModule);
