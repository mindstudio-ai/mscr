import smartsheet from 'smartsheet';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { workspaceId, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  const accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Deleting workspace ${workspaceId}...`);

    const result = await client.workspaces.deleteWorkspace({ workspaceId });

    log(`Successfully deleted workspace: ${workspaceId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error deleting workspace: ${error.message}`);
    throw error;
  }
};
