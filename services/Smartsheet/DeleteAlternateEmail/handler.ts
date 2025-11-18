import { DeleteAlternateEmailInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: DeleteAlternateEmailInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { userId, alternateEmailId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!alternateEmailId) {
    throw new Error('Alternate Email ID is required');
  }

  log(`Deleting alternate email ${alternateEmailId} for user: ${userId}`);

  try {
    await smartsheetApiRequest({
      method: 'DELETE',
      path: `/users/${userId}/alternateemails/${alternateEmailId}`,
    });

    log('Successfully deleted alternate email');

    setOutput(outputVariable, {
      success: true,
      deletedEmailId: alternateEmailId,
      userId,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error('User or alternate email not found');
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        'Permission denied. System administrator access required.',
      );
    } else {
      throw new Error(`Failed to delete alternate email: ${errorMessage}`);
    }
  }
};
