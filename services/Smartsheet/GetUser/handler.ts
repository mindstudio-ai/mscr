import smartsheet from 'smartsheet';
import { GetUserInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetUserInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { userId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Retrieving user ${userId}...`);

    const result = await client.users.getUser({ userId });

    log(`Successfully retrieved user: ${result.email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting user: ${error.message}`);
    throw error;
  }
};
