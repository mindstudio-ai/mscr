export interface ListAutomationRulesInputs {
  sheetId: string;
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
  outputVariable: string;
}

export interface ListAutomationRulesQueryParameters {
  includeAll?: boolean;
  page?: number;
  pageSize?: number;
}
