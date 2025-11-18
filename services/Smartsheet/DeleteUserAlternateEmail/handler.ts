import { DeleteUserAlternateEmailInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteUserAlternateEmailInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { userId, alternateEmailId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!alternateEmailId) {
    throw new Error('Alternate email ID is required');
  }

  try {
    log(`Deleting alternate email ${alternateEmailId} for user ${userId}...`);

    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/users/${userId}/alternateemails/${alternateEmailId}`,
    });

    log(`Successfully deleted alternate email: ${alternateEmailId}`);
    setOutput(outputVariable, {
      success: true,
      deletedAlternateEmailId: alternateEmailId,
      userId,
    });
  } catch (error: any) {
    log(`Error deleting alternate email: ${error.message}`);
    throw error;
  }
};
