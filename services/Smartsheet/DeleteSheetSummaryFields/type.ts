export interface DeleteSheetSummaryFieldsInputs {
  sheetId: string;
  ids: string;
  ignoreSummaryFieldsNotFound?: boolean;
  outputVariable: string;
}

export interface DeleteSheetSummaryFieldsQueryParameters {
  ids: string;
  ignoreSummaryFieldsNotFound?: boolean;
}
