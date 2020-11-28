export interface ResponseList {
  items: any;
  responseDateTime: string;
}

export interface ResponseItem {
  entity: any;
  responseDateTime: string;
}

export interface Response {
  entityId: number;
  responseDateTime: string;
}

export interface ResponsePagination {
  totalCount: number;
  items: any[];
  responseDateTime: string;
}
