export interface AddCellImageInputs {
  sheetId: string;
  rowId: string;
  columnId: string;
  altText?: string;
  overrideValidation?: boolean;
  outputVariable: string;
}

export interface AddCellImageQueryParameters {
  altText?: string;
  overrideValidation?: boolean;
}
