import smartsheet from 'smartsheet';
import { DeleteGroupInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteGroupInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { groupId, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Deleting group ${groupId}`);

  try {
    await client.groups.deleteGroup({ groupId });
    log('Group deleted successfully');
    setOutput(outputVariable, {
      success: true,
      deletedGroupId: groupId,
    });
  } catch (error: any) {
    throw new Error(`Failed to delete group: ${error.message}`);
  }
};
