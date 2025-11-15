import smartsheet from 'smartsheet';
import { GetAlternateEmailInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetAlternateEmailInputs;
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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });

  log(`Retrieving alternate email ${alternateEmailId} for user: ${userId}`);

  try {
    const response = await client.users.getAlternateEmail({
      userId,
      alternateEmailId,
    });

    log(`Successfully retrieved alternate email: ${response.email}`);

    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error('User or alternate email not found');
    } else if (error.statusCode === 403) {
      throw new Error('Permission denied');
    } else {
      throw new Error(`Failed to get alternate email: ${errorMessage}`);
    }
  }
};
