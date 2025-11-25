export interface ImportSheetIntoFolderInputs {
  folderId: string;
  sheetname: string;
  headerrowindex?: number;
  primarycolumnindex?: number;
  filePath: string;
  fileName?: string;
  outputVariable: string;
}
