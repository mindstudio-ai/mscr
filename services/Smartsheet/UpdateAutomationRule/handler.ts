import smartsheet from 'smartsheet';
import { UpdateAutomationRuleInputs } from './type';

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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Updating automation rule ${automationRuleId}`);

  try {
    const updateBody: any = {};
    if (enabled !== undefined) {
      updateBody.enabled = enabled;
    }

    const response = await client.sheets.updateAutomationRule({
      sheetId,
      automationRuleId,
      body: updateBody,
    });
    log('Successfully updated automation rule');
    setOutput(outputVariable, response.result);
  } catch (error: any) {
    throw new Error(`Failed to update automation rule: ${error.message}`);
  }
};
