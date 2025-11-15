import smartsheet from 'smartsheet';
import { ListUserAlternateEmailsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListUserAlternateEmailsInputs;
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
    log(`Listing alternate emails for user ${userId}...`);

    const result = await client.users.listAlternateEmails({ userId });

    log(`Successfully retrieved ${result.totalCount} alternate emails`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing alternate emails: ${error.message}`);
    throw error;
  }
};
