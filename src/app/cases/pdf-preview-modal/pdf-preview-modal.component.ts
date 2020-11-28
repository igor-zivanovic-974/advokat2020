import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pdf-preview-modal',
  templateUrl: './pdf-preview-modal.component.html',
  styleUrls: ['./pdf-preview-modal.component.scss'],
})
export class PdfPreviewModalComponent implements OnInit {
  @Input() selectedDocument: any;

  constructor(private modalService: NgbModal) {}

  ngOnInit(): void {
    setTimeout(() => {
      alert(this.selectedDocument);
    }, 200);
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
