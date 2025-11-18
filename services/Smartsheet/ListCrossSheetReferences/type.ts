export interface ListCrossSheetReferencesInputs {
  sheetId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListCrossSheetReferencesQueryParameters {
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
}
