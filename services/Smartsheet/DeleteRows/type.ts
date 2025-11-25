export interface DeleteRowsInputs {
  sheetId: string;
  rowIds: string;
  ids: string;
  ignoreRowsNotFound?: boolean;
  outputVariable: string;
}
