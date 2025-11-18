import { RemoveUserInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<RemoveUserInputs>) => {
  const { userId, transferTo, removeFromSharing, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    log(`Removing user ${userId}...`);

    const queryParams: Record<string, string | boolean> = {};
    if (transferTo) {
      queryParams.transferTo = transferTo;
    }
    if (removeFromSharing !== undefined) {
      queryParams.removeFromSharing = removeFromSharing;
    }

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/users/${userId}`,
      queryParams,
    });

    log(`Successfully removed user: ${userId}`);
    setOutput(outputVariable, { success: true, removedUserId: userId });
  } catch (error: any) {
    log(`Error removing user: ${error.message}`);
    throw error;
  }
};
