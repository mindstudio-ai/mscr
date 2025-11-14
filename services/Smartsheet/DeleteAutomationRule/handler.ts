import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
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
  log(`Deleting automation rule ${automationRuleId}`);

  try {
    await client.sheets.deleteAutomationRule({ sheetId, automationRuleId });
    log('Successfully deleted automation rule');
    setOutput(outputVariable, {
      success: true,
      deletedRuleId: automationRuleId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete automation rule: ${error.message}`);
  }
};
