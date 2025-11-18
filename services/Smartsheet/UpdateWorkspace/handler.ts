import { UpdateWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateWorkspaceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { workspaceId, name, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!name) {
    throw new Error('Workspace name is required');
  }

  try {
    log(`Updating workspace ${workspaceId}...`);

    const queryParams: Record<string, number> = {};
    if (inputs.accessApiLevel !== undefined) {
      queryParams.accessApiLevel = inputs.accessApiLevel;
    }

    const result = await smartsheetApiRequest({
      method: 'PUT',
      path: `/workspaces/${workspaceId}`,
      queryParams,
      body: { name },
    });

    log(`Successfully updated workspace: ${name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error updating workspace: ${error.message}`);
    throw error;
  }
};
