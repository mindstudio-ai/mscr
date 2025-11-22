export interface CreateUpdateRequestInputs {
  sheetId: string;
  rowIds?: string;
  columnIds?: string;
  includeAttachments?: any;
  includeDiscussions?: any;
  layout?: any;
  ccMe?: any;
  message?: any;
  sendTo?: string;
  subject?: any;
  id?: any;
  createdAt?: any;
  modifiedAt?: any;
  schedule?: string;
  sentBy?: string;
  outputVariable: string;
}
