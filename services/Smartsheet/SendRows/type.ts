export interface SendRowsInputs {
  sheetId: string;
  rowIds?: string;
  columnIds?: string;
  includeAttachments?: string;
  includeDiscussions?: string;
  layout?: string;
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  outputVariable: string;
}
