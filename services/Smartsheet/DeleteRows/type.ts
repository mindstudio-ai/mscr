export interface DeleteRowsInputs {
  sheetId: string;
  ids: string;
  ignoreRowsNotFound?: boolean;
  outputVariable: string;
}

export interface DeleteRowsQueryParameters {
  ids: string;
  ignoreRowsNotFound?: boolean;
}
