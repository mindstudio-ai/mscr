export interface UpdateRowsInputs {
  sheetId: string;
  rowsData: string;
  accessApiLevel?: number;
  allowPartialSuccess?: boolean;
  overrideValidation?: boolean;
  outputVariable: string;
}
