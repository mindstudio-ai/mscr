export interface CopySheetInputs {
  sheetId: string;
  destinationId?: string;
  destinationType?: string;
  newName?: string;
  include?: string;
  exclude?: string;
  outputVariable: string;
}
