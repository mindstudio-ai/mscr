export interface CreateSheetInputs {
  sheetName: string;
  columns: string;
  folderId?: string;
  workspaceId?: string;
  include?: string;
  accessApiLevel?: number;
  outputVariable: string;
}
