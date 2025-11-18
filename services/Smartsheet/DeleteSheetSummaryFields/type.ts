export interface DeleteSheetSummaryFieldsInputs {
  sheetId: string;
  fieldIds: string;
  ids: string;
  ignoreSummaryFieldsNotFound?: boolean;
  outputVariable: string;
}
