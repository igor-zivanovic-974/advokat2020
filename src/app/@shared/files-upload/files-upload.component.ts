// import { Component, OnInit, Input } from '@angular/core';
// import { DocumentFile } from '@app/core/models/documentFile';
// import { NotificationsService } from '../notifications.service';
// import { TranslateService } from '@ngx-translate/core';
// import { FilesService } from '../files.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
// import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
// import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
// import { HttpClient, HttpRequest, HttpEventType } from '@angular/common/http';

// @Component({
//   selector: 'app-files-upload',
//   templateUrl: './files-upload.component.html',
//   styleUrls: ['./files-upload.component.scss']
// })
// export class FilesUploadComponent implements OnInit {
//   @Input() files: DocumentFile[];
//   @Input() kmId: string;
//   progress: number;
//   messages = {
//     documentAdded: () => this.translate.get('service.notification.document.added')
//   };

//   preparing: boolean;

//   constructor(
//     private notifier: NotificationsService,
//     private translate: TranslateService,
//     private filesService: FilesService,
//     private modalService: NgbModal,
//     private http: HttpClient
//   ) {}

//   ngOnInit() {}

//   openConfirmationDialog(item: any) {
//     const modalRef = this.modalService.open(ConfirmationDialogComponent, { windowClass: 'delete-image-modal' });
//     modalRef.componentInstance.item = item.fileName;
//     modalRef.componentInstance.passEntry.subscribe((receivedEntry: boolean) => {
//       if (receivedEntry) {
//         this.remove(item);
//       }
//     });
//   }

//   public dropped(files: NgxFileDropEntry[]) {
//     this.preparing = true;
//     for (const droppedFile of files) {
//       // Is it a file?
//       if (droppedFile.fileEntry.isFile) {
//         const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
//         fileEntry.file((file: File) => {
//           // You could upload it like this:
//           const formData = new FormData();
//           formData.append('file', file, file.name);

//           const uploadReq = new HttpRequest('POST', `/mcknownmethods/${this.kmId}/files`, formData, {
//             reportProgress: true
//           });
//           this.http.request(uploadReq).subscribe(event => {
//             if (event.type === HttpEventType.UploadProgress) {
//               this.progress = Math.round((100 * event.loaded) / event.total);
//               this.preparing = false;
//             } else if (event.type === HttpEventType.Response) {
//               this.preparing = false;
//               this.messages.documentAdded().subscribe((message: string) => this.notifier.showSuccess(message));
//               this.filesService.getFiles(this.kmId).subscribe((documents: DocumentFile[]) => {
//                 this.files = documents;
//               });
//             }
//           });
//         });
//       } else {
//         // It was a directory (empty directories are added, otherwise only files)
//         const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
//       }
//     }
//   }

//   downloadDocument(f: DocumentFile) {
//     this.filesService.downloadFile(f.id).subscribe((file: Blob) => {
//       const blob = new Blob([file], { type: 'application/octet-stream' });
//       if (window.navigator && window.navigator.msSaveOrOpenBlob) {
//         // for IE
//         window.navigator.msSaveOrOpenBlob(blob, f.name);
//       } else {
//         // for Non-IE (chrome, firefox etc.)
//         const a = document.createElement('a');
//         document.body.appendChild(a);
//         const url = URL.createObjectURL(blob);
//         a.href = url;
//         a.download = f.name;
//         a.click();
//         URL.revokeObjectURL(a.href);
//         a.remove();
//       }
//     });
//   }

//   remove(item: DocumentFile) {
//     this.filesService.removeDocument(item.id).subscribe((data: Response) => {
//       if (data) {
//         this.filesService.getFiles(this.kmId).subscribe((documents: DocumentFile[]) => {
//           this.files = documents;
//         });
//       }
//     });
//   }
// }
