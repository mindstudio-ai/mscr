export interface ImportSheetIntoWorkspaceInputs {
  workspaceId: string;
  sheetname: string;
  headerrowindex?: number;
  primarycolumnindex?: number;
  filePath: string;
  fileName?: string;
  outputVariable: string;
}
