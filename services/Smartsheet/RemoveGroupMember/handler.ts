import { RemoveGroupMemberInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

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

  log(`Removing user ${userId} from group ${groupId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/groups/${groupId}/members/${userId}`,
    });
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
