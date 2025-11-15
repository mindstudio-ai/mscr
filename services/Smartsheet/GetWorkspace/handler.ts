import smartsheet from 'smartsheet';
import { GetWorkspaceInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetWorkspaceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { workspaceId, loadAll, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Retrieving workspace ${workspaceId}...`);

    const options: any = { workspaceId };
    if (loadAll) {
      options.queryParameters = { loadAll: true };
    }

    const result = await client.workspaces.getWorkspace(options);

    log(`Successfully retrieved workspace: ${result.name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting workspace: ${error.message}`);
    throw error;
  }
};
