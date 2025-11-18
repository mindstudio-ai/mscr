export interface CreateCrossSheetReferenceInputs {
  sheetId: string;
  name: string;
  sourceSheetId: string;
  startRowId: string;
  endRowId: string;
  startColumnId: string;
  endColumnId: string;
  outputVariable: string;
}
