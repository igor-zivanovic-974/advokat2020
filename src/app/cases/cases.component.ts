import { Component, OnInit } from '@angular/core';
import { CasesService } from './cases.service';
import { Case } from '@app/@core/interfaces/case';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { GlobalService } from '@app/shell/global.service';
import { FileService } from '@app/@shared/services/file.service';

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
  searchValue = '';
  selectedCase: Case;
  selectedCaseId = 0;
  fileToUpload: File = null;
  preparing: boolean;
  progress: number;
  selectedDocument: string;
  filteredCases: Case[];

  constructor(
    private casesService: CasesService,
    private router: Router,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
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
      this.filteredCases = data;
      // console.log('CASES: ', this.cases);
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
      this.searchValue = this.searchValue.trim();
      this.filteredCases = this.cases.filter((c) => {
        return (
          c.subject.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          c.caseTitle.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          c.caseNumber.toLowerCase().includes(this.searchValue.toLowerCase()) ||
          c.year.includes(this.searchValue) ||
          c.registrationMark.name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      });
    }, 500);
  }

  setActiveCase(c: Case) {
    this.selectedCaseId = c.id;
    this.selectedCase = c;
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
