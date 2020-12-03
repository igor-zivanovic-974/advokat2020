import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { CasesComponent } from './cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '@app/@shared/shared.module';
import { CasesService } from './cases.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxFileDropModule } from 'ngx-file-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
import { NgSelectModule } from '@ng-select/ng-select';
import { FileListComponent } from './edit-case/file-list/file-list.component';
import { CaseHistoryComponent } from './edit-case/case-history/case-history.component';
import { SelectCourtTypeModalComponent } from './edit-case/select-court-type-modal/select-court-type-modal.component';
import { CaseMovementsComponent } from './edit-case/case-movements/case-movements.component';

@NgModule({
  declarations: [
    CasesComponent,
    EditCaseComponent,
    FileListComponent,
    CaseHistoryComponent,
    SelectCourtTypeModalComponent,
    CaseMovementsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SharedModule,
    SimpleNotificationsModule,
    NgxSpinnerModule,
    NgxFileDropModule,
    NgSelectModule,
    PdfViewerModule,
    CasesRoutingModule,
  ],
  providers: [CasesService],
  exports: [PdfViewerComponent],
  entryComponents: [SelectCourtTypeModalComponent],
})
export class CasesModule { }
