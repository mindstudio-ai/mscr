export interface AddCellImageInputs {
  sheetId: string;
  rowId: string;
  columnId: string;
  imageId: string;
  altText?: string;
  overrideValidation?: boolean;
  outputVariable: string;
}
