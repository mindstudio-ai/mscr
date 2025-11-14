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
  const { name, outputVariable } = inputs;

  if (!name) {
    throw new Error('Workspace name is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Creating workspace ${name}...`);

    const result = await client.workspaces.createWorkspace({
      body: { name },
    });

    log(`Successfully created workspace: ${name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error creating workspace: ${error.message}`);
    throw error;
  }
};
