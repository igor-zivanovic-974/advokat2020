import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';
import { Document } from '@core/models/document';
import { finalize } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-preview-image',
  templateUrl: './preview-image.component.html',
  styleUrls: ['./preview-image.component.scss'],
})
export class PreviewImageComponent implements OnInit {
  @Input() title: string;
  @Input() selectedImage: Document;
  @Input() images: Document[];
  @Output() passEntry: EventEmitter<boolean> = new EventEmitter();
  fullFile: Document;
  isLoading: boolean;
  _DomSanitizationService: DomSanitizer;
  pdfSource = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';

  constructor(private fileService: FileService, private modal: NgbModal, private domSanitizationService: DomSanitizer) {
    this._DomSanitizationService = this.domSanitizationService;
  }

  // @HostListener('document:keydown', ['$event'])
  // handleKeyboardEvent(event: KeyboardEvent) {
  //   if (event.key === 'ArrowLeft') {
  //     this.prev();
  //   } else if (event.key === 'ArrowRight') {
  //     this.next();
  //   }
  // }

  ngOnInit() {
    // this.isLoading = true;
    // this.getFullFile(this.selectedImage);
  }

  getFullFile(document: Document) {
    this.fileService
      .getFullFile(document)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe((d: Document) => {
        this.fullFile = d;
      });
  }

  prev() {
    this.isLoading = true;
    const image = this.images.find((i) => i.id === this.fullFile.id);
    let index: number = this.images.indexOf(image);
    index--;
    index = index < 0 ? this.images.length - 1 : index;
    this.getFullFile(this.images[index]);
  }

  next() {
    this.isLoading = true;
    const image = this.images.find((i) => i.id === this.fullFile.id);
    let index: number = this.images.indexOf(image);
    index++;
    index = index < this.images.length ? index : 0;
    this.getFullFile(this.images[index]);
  }

  closeModal() {
    this.modal.dismissAll();
  }
}
