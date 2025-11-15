import smartsheet from 'smartsheet';
import { ListAutomationRulesInputs } from './type';

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
  const { sheetId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Listing automation rules for sheet: ${sheetId}`);

  try {
    const response = await client.sheets.listAutomationRules({ sheetId });
    log(`Found ${response.data?.length || 0} automation rule(s)`);
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      automationRules: response.data,
    });
  } catch (error: any) {
    throw new Error(`Failed to list automation rules: ${error.message}`);
  }
};
