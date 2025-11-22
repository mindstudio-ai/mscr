export interface AddCellImageInputs {
  sheetId: string;
  rowId: string;
  columnId: string;
  imageUrl: string;
  imageName: string;
  altText?: string;
  overrideValidation?: boolean;
  outputVariable: string;
}
