export interface GetRowInputs {
  sheetId: string;
  rowId: string;
  includeDiscussions?: boolean;
  includeAttachments?: boolean;
  includeColumns?: boolean;
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  level?: number;
  outputVariable: string;
}
