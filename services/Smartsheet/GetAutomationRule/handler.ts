import smartsheet from 'smartsheet';
import { GetAutomationRuleInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetAutomationRuleInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, automationRuleId, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!automationRuleId) {
    throw new Error('Automation Rule ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Getting automation rule ${automationRuleId}`);

  try {
    const response = await client.sheets.getAutomationRule({
      sheetId,
      automationRuleId,
    });
    log(`Retrieved rule: ${response.name}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get automation rule: ${error.message}`);
  }
};
