import { Component, OnInit } from '@angular/core';
import { CasesService } from './cases.service';
import { Case } from '@app/@core/interfaces/case';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HelperService } from '@app/@core/services/helper.service';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/shell/global.service';
import { FileService } from '@app/@shared/services/file.service';
import { PreviewImageComponent } from '@app/@shared/preview-image/preview-image.component';
import { Document } from '@core/models/document';
import { EditCaseComponent } from './edit-case/edit-case.component';
import { CaseHistoryComponent } from './edit-case/case-history/case-history.component';

declare var require: any;
const FileSaver = require('file-saver');

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss'],
})
export class CasesComponent implements OnInit {
  modalState: boolean;
  cases: Case[] = [];
  isMobileScreen$: Observable<boolean>;
  hasSideMenu$: Observable<boolean>;
  link = 'cases/';
  filter = '';
  selectedCase: Case;
  selectedCaseId = 0;
  fileToUpload: File = null;
  preparing: boolean;
  progress: number;
  selectedDocument: string;

  constructor(
    private casesService: CasesService,
    // private translateService: TranslateService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private helperService: HelperService,
    private _globalService: GlobalService,
    private fileService: FileService
  ) {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    this.hasSideMenu$ = this._globalService.hasSideMenu$;
  }

  ngOnInit() {
    this.spinner.show();
    this.getCases();
  }

  getCases() {
    this.casesService.getCases().subscribe((data: Case[]) => {
      this.cases = data;
      // this.cases.forEach((x) => (x.courtName = this.helperService.getCourt(x.id)));
      console.log('CASES: ', this.cases);
      this.spinner.hide();
    });
  }

  showFileInModal(file: string, content: any) {
    this.selectedDocument = file;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'xxlModal' }).result.then(
      (result) => {
        // this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  openRelatedCase(id?: number) {
    alert(id);
    // const modalRef = this.modalService.open(CaseHistoryComponent, { size: 'xl', scrollable: true });
    // modalRef.componentInstance.title = 'case.history-movement';
    // modalRef.componentInstance.caseHistory = this.selectedCase.caseMovements;
    // modalRef.componentInstance.disabled = true;
  }

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   this.uploadFileToActivity();
  // }

  // uploadFileToActivity() {
  //   this.casesService.postFile(this.fileToUpload).subscribe((data) => {
  //     // fileUploadService
  //     // do something, if upload success
  //     // }, error => {
  //     //   console.log(error);
  //   });
  // }

  searchCases() {
    setTimeout(() => {
      console.log(this.filter);
    }, 500);
  }

  setActiveCase(caseId: number) {
    this.selectedCaseId = caseId;
    // this.selectedDocument = null;
    this.selectedCase = this.cases.find((c) => c.id === caseId);
  }

  goToUrl(mode: string, caseId?: number) {
    if (mode !== 'new') {
      this.router.navigate([`${this.link}/${mode}/${caseId}`]);
    } else {
      this.router.navigate([`${this.link}/${mode}`]);
    }
  }

  invokeDelete(id: number) {
    const size = this.isMobileScreen$ ? 'md' : 'xl';
    const modalRef = this.modalService.open(DeleteModalComponent, { size: '{size}' });
    modalRef.componentInstance.confirm.subscribe((res: boolean) => {
      if (res) {
        this.delete(id);
      }
    });
  }

  delete(id: number) {
    this.casesService.deleteCase(id).subscribe((x: any) => {
      this.getCases();
    });
  }
}
