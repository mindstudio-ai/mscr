import { CopyWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CopyWorkspaceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { workspaceId, newName, include, skipRemap, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!newName) {
    throw new Error('New name is required');
  }

  try {
    log(`Copying workspace ${workspaceId}...`);

    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }
    if (skipRemap) {
      queryParams.skipRemap = skipRemap;
    }

    const copySpec: any = {
      newName,
    };

    const result = await smartsheetApiRequest({
      method: 'POST',
      path: `/workspaces/${workspaceId}/copy`,
      queryParams,
      body: copySpec,
    });

    log(`Successfully copied workspace: ${newName}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error copying workspace: ${error.message}`);
    throw error;
  }
};
