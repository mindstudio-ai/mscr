import smartsheet from 'smartsheet';
import { GetCurrentUserInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: GetCurrentUserInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { outputVariable } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log('Retrieving current user information...');

    const result = await client.users.getCurrentUser();

    log(`Successfully retrieved current user: ${result.email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting current user: ${error.message}`);
    throw error;
  }
};
