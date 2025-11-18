export interface CopyRowsToAnotherSheetInputs {
  sheetId: string;
  include?: string;
  ignorerowsnotfound?: boolean;
  rowids?: string;
  toSheetid?: string;
  outputVariable: string;
}
