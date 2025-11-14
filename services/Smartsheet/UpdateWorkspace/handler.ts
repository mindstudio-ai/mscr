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
  const { workspaceId, name, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!name) {
    throw new Error('Workspace name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Updating workspace ${workspaceId}...`);

    const result = await client.workspaces.updateWorkspace({
      workspaceId,
      body: { name },
    });

    log(`Successfully updated workspace: ${name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error updating workspace: ${error.message}`);
    throw error;
  }
};
