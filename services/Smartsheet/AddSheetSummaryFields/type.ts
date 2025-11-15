export interface SheetSummaryField {
  title: string;
  type: string;
  formula?: string;
  [key: string]: any;
}

export interface AddSheetSummaryFieldsInputs {
  sheetId: string;
  fieldsJson: string | SheetSummaryField[];
  outputVariable: string;
}
