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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Listing folders in workspace ${workspaceId}`);

  try {
    const response = await client.workspaces.getWorkspace({ workspaceId });
    const folders = response.folders || [];
    log(`Found ${folders.length} folder(s)`);
    setOutput(outputVariable, {
      totalCount: folders.length,
      folders,
    });
  } catch (error: any) {
    throw new Error(`Failed to list folders: ${error.message}`);
  }
};
