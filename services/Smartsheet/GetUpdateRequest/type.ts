export interface GetUpdateRequestInputs {
  sheetId: string;
  updateRequestId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
