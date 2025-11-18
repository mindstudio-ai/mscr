export interface UpdateSheetSummaryFieldsInputs {
  sheetId: string;
  fieldsJson: string;
  renameIfConflict?: boolean;
  outputVariable: string;
}
