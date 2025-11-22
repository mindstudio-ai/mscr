export interface SendRowsInputs {
  sheetId: string;
  rowIds?: string;
  columnIds?: string;
  includeAttachments?: boolean;
  includeDiscussions?: boolean;
  layout?: 'HORIZONTAL' | 'VERTICAL';
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  outputVariable: string;
}
