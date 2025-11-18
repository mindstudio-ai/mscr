export interface AddImageToSheetSummaryInputs {
  sheetId: string;
  fieldId: string;
  alttext?: string;
  overridevalidation?: boolean;
  filePath: string;
  fileName?: string;
  outputVariable: string;
}

export interface AddImageToSheetSummaryQueryParameters {
  alttext?: string;
  overridevalidation?: boolean;
}
