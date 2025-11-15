import smartsheet from 'smartsheet';
import { AddUserAlternateEmailInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddUserAlternateEmailInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { userId, email, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!email) {
    throw new Error('Email is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Adding alternate email ${email} for user ${userId}...`);

    const result = await client.users.addAlternateEmail({
      userId,
      body: [{ email }],
    });

    log(`Successfully added alternate email: ${email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error adding alternate email: ${error.message}`);
    throw error;
  }
};
