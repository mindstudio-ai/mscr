import { DeleteWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeleteWorkspaceInputs>) => {
  const { workspaceId, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  try {
    log(`Deleting workspace ${workspaceId}...`);

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/workspaces/${workspaceId}`,
    });

    log(`Successfully deleted workspace: ${workspaceId}`);
    setOutput(outputVariable, {
      success: true,
      deletedWorkspaceId: workspaceId,
    });
  } catch (error: any) {
    log(`Error deleting workspace: ${error.message}`);
    throw error;
  }
};
