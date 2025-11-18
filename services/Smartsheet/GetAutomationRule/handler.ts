import { GetAutomationRuleInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

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

  log(`Getting automation rule ${automationRuleId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'GET',
      path: `/sheets/${sheetId}/automationrules/${automationRuleId}`,
    });
    log(`Retrieved rule: ${(response as any).name}`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to get automation rule: ${error.message}`);
  }
};
