import smartsheet from 'smartsheet';
import { GetUserAlternateEmailInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetUserAlternateEmailInputs;
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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Retrieving alternate email ${alternateEmailId} for user ${userId}...`);

    const result = await client.users.getAlternateEmail({
      userId,
      alternateEmailId,
    });

    log(`Successfully retrieved alternate email: ${result.email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting alternate email: ${error.message}`);
    throw error;
  }
};
