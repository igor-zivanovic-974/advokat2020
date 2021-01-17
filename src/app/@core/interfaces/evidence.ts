export class Evidence {
  id: number;
  name: string;
  caseId: number;
  dateAdded: Date;

  constructor(id: number, name: string, caseId: number, dateAdded: Date) {
    this.id = id;
    this.name = name;
    this.caseId = caseId;
    this.dateAdded = dateAdded;
  }
}
