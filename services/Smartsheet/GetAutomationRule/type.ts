export interface GetAutomationRuleInputs {
  sheetId: string;
  automationRuleId: string;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  outputVariable: string;
}
