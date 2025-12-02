export interface SendRowsInputs {
  sheetId: string;
  rowIds?: string;
  columnIds?: string;
  includeAttachments: string;
  includeDiscussions: string;
  layout?: 'HORIZONTAL' | 'VERTICAL';
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  outputVariable: string;
}
