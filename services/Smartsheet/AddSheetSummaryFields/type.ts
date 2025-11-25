export interface AddSheetSummaryFieldsInputs {
  sheetId: string;
  fieldsJson: string;
  renameIfConflict?: boolean;
  outputVariable: string;
}
