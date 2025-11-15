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

export interface CrossSheetReferenceBody {
  name: string;
  sourceSheetId: number;
  startRowId: number;
  endRowId: number;
  startColumnId: number;
  endColumnId: number;
}
