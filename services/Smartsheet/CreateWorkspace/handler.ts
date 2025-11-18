import { CreateWorkspaceInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: CreateWorkspaceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { name, include, skipRemap, accessApiLevel, outputVariable } = inputs;

  if (!name) {
    throw new Error('Workspace name is required');
  }

  try {
    log(`Creating workspace ${name}...`);

    const queryParams: Record<string, string | number> = {};
    if (include) {
      queryParams.include = include;
    }
    if (skipRemap) {
      queryParams.skipRemap = skipRemap;
    }
    if (accessApiLevel !== undefined) {
      queryParams.accessApiLevel = accessApiLevel;
    }

    const result = await smartsheetApiRequest({
      method: 'POST',
      path: '/workspaces',
      queryParams,
      body: { name },
    });

    log(`Successfully created workspace: ${name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error creating workspace: ${error.message}`);
    throw error;
  }
};
