export interface GetRowInputs {
  sheetId: string;
  rowId: string;
  includeDiscussions?: boolean;
  includeAttachments?: boolean;
  includeColumns?: boolean;
  outputVariable: string;
}

export interface GetRowQueryParameters {
  include?: string;
}
