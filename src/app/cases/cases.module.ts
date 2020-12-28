import { NgModule } from '@angular/core';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { CasesComponent } from './cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { SharedModule } from '@app/@shared/shared.module';
import { CasesService } from './cases.service';
import { NgxFileDropModule } from 'ngx-file-drop';
import { PdfViewerComponent, PdfViewerModule } from 'ng2-pdf-viewer';
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
    SharedModule,
    NgxFileDropModule,
    PdfViewerModule,
    CasesRoutingModule,
  ],
  providers: [CasesService],
  exports: [PdfViewerComponent],
  entryComponents: [SelectCourtTypeModalComponent],
})
export class CasesModule { }
