export interface ImportSheetIntoFolderInputs {
  folderId: string;
  fileUrl: string;
  fileName?: string;
  sheetName?: string;
  headerRowIndex?: string;
  primaryColumnIndex?: string;
  outputVariable: string;
}
