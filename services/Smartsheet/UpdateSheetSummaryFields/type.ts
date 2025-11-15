export interface SheetSummaryFieldUpdate {
  id: number;
  title?: string;
  type?: string;
  formula?: string;
  [key: string]: any;
}

export interface UpdateSheetSummaryFieldsInputs {
  sheetId: string;
  fieldsJson: string | SheetSummaryFieldUpdate[];
  outputVariable: string;
}
