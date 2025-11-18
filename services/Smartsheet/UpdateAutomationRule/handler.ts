import { UpdateAutomationRuleInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateAutomationRuleInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { sheetId, automationRuleId, enabled, outputVariable } = inputs;

  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }
  if (!automationRuleId) {
    throw new Error('Automation Rule ID is required');
  }

  log(`Updating automation rule ${automationRuleId}`);

  try {
    const updateBody: any = {};
    if (enabled !== undefined) {
      updateBody.enabled = enabled;
    }

    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/sheets/${sheetId}/automationrules/${automationRuleId}`,
      body: updateBody,
    });
    log('Successfully updated automation rule');
    setOutput(outputVariable, response);
  } catch (error: any) {
    throw new Error(`Failed to update automation rule: ${error.message}`);
  }
};
