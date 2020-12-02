import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeleteModalComponent } from '@app/@shared/modals/delete-modal/delete-modal.component';
import { GlobalService } from '@app/shell/global.service';
import { File } from '@core/interfaces/file';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.scss'],
})
export class FileListComponent implements OnInit {
  @Input() items: File[];
  @Input() title: string;
  @Input() disabled?: boolean;
  @Input() mode?: string;
  @Output() changeOccured: EventEmitter<boolean> = new EventEmitter();
  wholeTitle: string;
  isMobileScreen$: Observable<boolean>;
  hasSideMenu$: Observable<boolean>;
  selectedDocument: string;

  constructor(private modalService: NgbModal, private _globalService: GlobalService) {
    this.isMobileScreen$ = this._globalService.isMobileScreen$;
    this.hasSideMenu$ = this._globalService.hasSideMenu$;
  }

  ngOnInit(): void {
    this.wholeTitle = 'case.' + this.title;
    // console.log(this.title);
    // console.log(this.items);
  }

  addFile() {
    alert('add');
    this.changeOccured.emit(true);
  }

  invokeDeleteFile(fileId: number) {
    const modalRef = this.modalService.open(DeleteModalComponent, { size: 'xl' });
    modalRef.componentInstance.confirm.subscribe((res: boolean) => {
      if (res) {
        // this.removeFile(fileId);
        alert(fileId);
      }
    });
  }

  removeFile(fileId: number) {
    alert('deleted file' + fileId);
    this.changeOccured.emit(true);
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
}
