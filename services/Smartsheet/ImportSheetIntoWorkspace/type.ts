export interface ImportSheetIntoWorkspaceInputs {
  workspaceId: string;
  fileUrl: string;
  fileName?: string;
  sheetName?: string;
  headerRowIndex?: string;
  primaryColumnIndex?: string;
  outputVariable: string;
}
