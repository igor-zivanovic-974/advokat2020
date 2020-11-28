import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseItem, ResponseList } from '@core/models/response';
import { NotificationsService } from '@shared/services/notifications.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Document } from '@core/models/document';

const routes = {
  downloadFile: (file: string) => `files/${file}`,
  files: (fileType: string, caseId: number) => `files/${fileType}/${caseId}`,
  file: (id: number) => `/files/${id}`,
};

export interface FileSizeValueUnit {
  value: number;
  unit: string;
}

export interface File extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

@Injectable({
  providedIn: 'root',
})
export class FileService {
  uploadUrl = 'https://file.io/';
  downloadloadUrl = 'https://file.io';
  units = ['bytes', 'KB', 'MB'];
  messages = {
    fileAdded: () => this.translate.get('service.notification.image.added'),
    fileRemoved: () => this.translate.get('service.notification.image.removed'),
  };

  constructor(private http: HttpClient, private notifier: NotificationsService, private translate: TranslateService) {}

  getFiles(fileType: string, id: any): Observable<File[]> {
    id = '' + id;
    return this.http.get(routes.files(fileType, id)).pipe(
      map((body: ResponseList) => body.items),
      catchError(() => of(false))
    );
  }

  getFullFile(file: Document) {
    return this.http.get(routes.file(file.id)).pipe(
      map((body: ResponseItem) => body.entity),
      catchError(() => of(false))
    );
  }

  public upload(formData: FormData) {
    return this.http.post<any>(this.uploadUrl, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  downloadFile(file: string): Observable<any> {
    return this.http.get(routes.downloadFile(file), { responseType: 'blob' });
  }

  transform(bytes: number = 0, precision: number = 2): FileSizeValueUnit {
    if (isNaN(parseFloat(String(bytes))) || !isFinite(bytes)) {
      return null;
    }
    let unit = 0;
    while (bytes >= 1024) {
      bytes /= 1024;
      unit++;
    }
    return { value: Number(bytes.toFixed(+precision)), unit: this.units[unit] };
  }

  removeFile(id: any): Observable<any> {
    // id = '' + id;
    return this.http.delete(routes.file(+id)).pipe(
      map((body: Response) => {
        this.messages.fileRemoved().subscribe((message: string) => this.notifier.showSuccess(message));
        return body as Response;
      }),
      catchError(() => of(false))
    );
  }
}
