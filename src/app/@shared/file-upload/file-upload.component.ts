import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbModal, NgbModalConfig, ModalDismissReasons, NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { HttpEventType, HttpErrorResponse, HttpRequest, HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { File } from '@app/@core';
import { Document } from '@core/models/document';
import { File } from '../services/file.service';
import { FileService } from '../services/file.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService } from '@shared/services/notifications.service';
import { PreviewImageComponent } from '../preview-image/preview-image.component';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
  // @Input() files: File[] = [];
  @Input() caseId: number;
  @Input() fileType?: string;
  @ViewChild('fileUpload', { static: false }) fileUpload: ElementRef;
  files: any[] = [];
  clicked = false;
  preparing: boolean;
  progress: number;
  messages = {
    errorUploading: () => this.translate.get('admin.lookups.error-uploading-file'),
    fileAdded: () => this.translate.get('service.notification.file.added'),
    fileTypeWarning: () => this.translate.get('admin.lookups.file-type-warning'),
    fileSizeWarning: () => this.translate.get('admin.lookups.file-size-warning'),
    fileNameWarning: () => this.translate.get('admin.lookups.file-name-warning'),
  };
  private fileTypes = ['pdf']; // ['image/jpeg', 'image/png'];

  constructor(
    private fileService: FileService,
    private translate: TranslateService,
    private modalService: NgbModal,
    private http: HttpClient,
    private notifier: NotificationsService
  ) {}

  ngOnInit(): void {}

  uploadFile(file: any) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    this.fileService
      .upload(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              file.progress = Math.round((event.loaded * 100) / event.total);
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          file.inProgress = false;
          return of(`${file.data.name} upload failed.`);
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          // console.log(event.body);
        }
        this.clicked = false;
      });
    this.clicked = false;
  }

  // onClick() {
  //   const fileUpload = this.fileUpload.nativeElement;
  //   fileUpload.onchange = () => {
  //     // for (let index = 0; index < fileUpload.files.length; index++)
  //     for (const f of fileUpload.files) {
  //       const file = fileUpload.files[f.index];
  //       this.files.push({ data: file, inProgress: false, progress: 0 });
  //     }
  //     this.uploadFiles();
  //   };
  //   fileUpload.click();
  // }

  dropped(files: NgxFileDropEntry[]) {
    this.preparing = true;
    for (const droppedFile of files) {
      // Is it a file?
      const reader = new FileReader();
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          reader.readAsDataURL(file);
          reader.onload = () => {
            const fileSizeTransformed: number = this.fileService.transform(file.size).value
              ? Number(this.fileService.transform(file.size).value)
              : null;
            const fileSizeUnit: string = this.fileService.transform(file.size).value
              ? this.fileService.transform(file.size).unit
              : null;
            if (
              !this.files.find((f: Document) => droppedFile.relativePath === f.fileName) &&
              fileSizeTransformed &&
              fileSizeUnit &&
              !(fileSizeUnit === this.fileService.units[2] && fileSizeTransformed > 1) &&
              !!this.fileTypes.find((t) => t === file.type)
            ) {
              // You could upload it like this:
              const formData = new FormData();
              formData.append('pdf', file, file.name);

              const uploadReq = new HttpRequest('POST', `/files/${this.fileType}/${this.caseId}`, formData, {
                reportProgress: true,
              });
              this.http.request(uploadReq).subscribe((event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.progress = Math.round((100 * event.loaded) / event.total);
                  this.preparing = false;
                } else if (event.type === HttpEventType.Response) {
                  this.preparing = false;
                  this.messages.fileAdded().subscribe((message: string) => this.notifier.showSuccess(message));
                  this.fileService.getFiles(this.fileType, this.caseId).subscribe((documents: File[]) => {
                    this.files = documents ? documents : this.files;
                  });
                }
              });
            } else {
              if (!this.fileTypes.find((t) => t === file.type)) {
                this.messages.errorUploading().subscribe((errorUploading: string) => {
                  this.messages
                    .fileTypeWarning()
                    .subscribe((message: string) =>
                      this.notifier.showError(`${errorUploading} '${droppedFile.relativePath}' - ${message}`)
                    );
                });
              } else if (
                !fileSizeTransformed ||
                !fileSizeTransformed ||
                (fileSizeUnit === this.fileService.units[2] && fileSizeTransformed > 1)
              ) {
                this.messages.errorUploading().subscribe((errorUploading: string) => {
                  this.messages
                    .fileSizeWarning()
                    .subscribe((message: string) =>
                      this.notifier.showError(`${errorUploading} '${droppedFile.relativePath}' - ${message}`)
                    );
                });
              } else {
                this.messages.errorUploading().subscribe((errorUploading: string) => {
                  this.messages
                    .fileNameWarning()
                    .subscribe((message: string) =>
                      this.notifier.showError(`${errorUploading} '${droppedFile.relativePath}' - ${message}`)
                    );
                });
              }
              this.preparing = false;
            }
          };
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      }
    }
  }

  remove(item: Document) {
    this.fileService.removeFile(item.id).subscribe((data: Response) => {
      if (data) {
        this.files.splice(this.files.indexOf(item), 1);
      }
    });
  }

  previewImage(image: File) {
    const modalRef = this.modalService.open(PreviewImageComponent, { size: 'lg', windowClass: 'preview-images-modal' });
    modalRef.componentInstance.selectedImage = image;
    modalRef.componentInstance.images = this.files;
  }

  private uploadFiles() {
    this.fileUpload.nativeElement.value = '';
    this.files.forEach((file) => {
      this.uploadFile(file);
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
