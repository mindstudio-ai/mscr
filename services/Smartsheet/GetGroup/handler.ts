import { GetGroupInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetGroupInputs>) => {
  const { groupId, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }

  log(`Getting group ${groupId}`);

  try {
    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/groups/${groupId}`,
    });
    log(`Retrieved group ${groupId} successfully`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    throw new Error(`Failed to get group: ${error.message}`);
  }
};
