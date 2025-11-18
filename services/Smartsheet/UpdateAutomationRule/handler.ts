import { UpdateAutomationRuleInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateAutomationRuleInputs>) => {
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
