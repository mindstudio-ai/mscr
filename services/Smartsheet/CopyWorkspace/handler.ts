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
  const { workspaceId, newName, includes, outputVariable } = inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!newName) {
    throw new Error('New name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Copying workspace ${workspaceId}...`);

    const copySpec: any = {
      newName,
    };

    if (includes && Array.isArray(includes) && includes.length > 0) {
      copySpec.includes = includes.join(',');
    }

    const result = await client.workspaces.copyWorkspace({
      workspaceId,
      body: copySpec,
    });

    log(`Successfully copied workspace: ${newName}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error copying workspace: ${error.message}`);
    throw error;
  }
};
