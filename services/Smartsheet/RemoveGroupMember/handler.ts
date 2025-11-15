import smartsheet from 'smartsheet';
import { RemoveGroupMemberInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: RemoveGroupMemberInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { groupId, userId, outputVariable } = inputs;

  if (!groupId) {
    throw new Error('Group ID is required');
  }
  if (!userId) {
    throw new Error('User ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });
  log(`Removing user ${userId} from group ${groupId}`);

  try {
    await client.groups.removeGroupMember({ groupId, userId });
    log('Member removed successfully');
    setOutput(outputVariable, {
      success: true,
      removedUserId: userId,
      groupId,
    });
  } catch (error: any) {
    throw new Error(`Failed to remove group member: ${error.message}`);
  }
};
