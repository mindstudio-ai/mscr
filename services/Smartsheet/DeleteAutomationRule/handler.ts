import { DeleteAutomationRuleInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteAutomationRuleInputs;
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

  log(`Deleting automation rule ${automationRuleId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/sheets/${sheetId}/automationrules/${automationRuleId}`,
    });
    log('Successfully deleted automation rule');
    setOutput(outputVariable, {
      success: true,
      deletedRuleId: automationRuleId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete automation rule: ${error.message}`);
  }
};
