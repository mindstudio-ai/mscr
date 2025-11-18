import { DeleteGroupInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteGroupInputs>) => {
  const { groupId, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }

  log(`Deleting group ${groupId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/groups/${groupId}`,
    });
    log('Group deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedGroupId: groupId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete group: ${error.message}`);
  }
};
