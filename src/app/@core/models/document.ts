export class Document {
  id: number;
  fileName: string;
  data: string; // ArrayBuffer | string;
  fileSize: number;
  fileSizeInUnit: number;
  unit: string;
}
