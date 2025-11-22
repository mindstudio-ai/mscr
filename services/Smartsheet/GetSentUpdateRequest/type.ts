export interface GetSentUpdateRequestInputs {
  sheetId: string;
  sentUpdateRequestId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
