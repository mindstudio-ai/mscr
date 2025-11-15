export interface ListSheetsInputs {
  includeOwnerInfo?: boolean;
  modifiedSince?: string;
  outputVariable: string;
}

export interface ListSheetsQueryParameters {
  include?: string;
  modifiedSince?: string;
}
