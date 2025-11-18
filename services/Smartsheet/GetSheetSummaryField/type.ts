export interface GetSheetSummaryFieldInputs {
  sheetId: string;
  fieldId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  include?: string;
  exclude?: string;
  outputVariable: string;
}

export interface GetSheetSummaryFieldQueryParameters {
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  include?: string;
  exclude?: string;
}
