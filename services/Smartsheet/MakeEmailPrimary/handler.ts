import { MakeEmailPrimaryInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: MakeEmailPrimaryInputs;
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

  log(`Making alternate email ${alternateEmailId} primary for user: ${userId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'PUT',
      path: `/users/${userId}/alternateemails/${alternateEmailId}/makeprimary`,
    });

    log(`Successfully made email primary: ${(response as any).email}`);

    setOutput(outputVariable, response);
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
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error('Email must be confirmed before it can be made primary');
    } else {
      throw new Error(`Failed to make email primary: ${errorMessage}`);
    }
  }
};
