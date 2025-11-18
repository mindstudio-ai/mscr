export interface ListSharesInputs {
  sheetId: string;
  sharingInclude?: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
  outputVariable: string;
}

export interface ListSharesQueryParameters {
  sharingInclude?: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  accessApiLevel?: number;
}
