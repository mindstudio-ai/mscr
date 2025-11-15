import smartsheet from 'smartsheet';
import { MoveWorkspaceInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: MoveWorkspaceInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { workspaceId, destinationId, destinationType, outputVariable } =
    inputs;

  if (!workspaceId) {
    throw new Error('Workspace ID is required');
  }

  if (!destinationId) {
    throw new Error('Destination ID is required');
  }

  if (!destinationType) {
    throw new Error('Destination type is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Moving workspace ${workspaceId}...`);

    const moveSpec: any = {
      destinationType,
      destinationId: parseInt(destinationId, 10),
    };

    const result = await client.workspaces.moveWorkspace({
      workspaceId,
      body: moveSpec,
    });

    log(`Successfully moved workspace: ${workspaceId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error moving workspace: ${error.message}`);
    throw error;
  }
};
