import { DeleteWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteWorkspaceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
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
