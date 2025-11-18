import { ListAutomationRulesInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListAutomationRulesInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, includeAll, page, pageSize, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  log(`Listing automation rules for sheet: ${sheetId}`);

  try {
    const queryParams: Record<string, string | number | boolean> = {};
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }

    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/sheets/${sheetId}/automationrules`,
      queryParams,
    });
    const data = (response as any).data || response;
    log(`Found ${Array.isArray(data) ? data.length : 0} automation rule(s)`);
    setOutput(outputVariable, {
      totalCount:
        (response as any).totalCount || (Array.isArray(data) ? data.length : 0),
      automationRules: data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list automation rules: ${error.message}`);
  }
};
