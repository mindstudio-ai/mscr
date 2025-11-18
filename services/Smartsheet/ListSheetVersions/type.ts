export interface ListSheetVersionsInputs {
  sheetId: string;
  page?: number;
  pageSize?: number;
  includeAll?: boolean;
  outputVariable: string;
}
