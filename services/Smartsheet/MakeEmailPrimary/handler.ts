import smartsheet from 'smartsheet';
import { MakeEmailPrimaryInputs } from './type';

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

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  const client = smartsheet.createClient({ accessToken });

  log(`Making alternate email ${alternateEmailId} primary for user: ${userId}`);

  try {
    const response = await client.users.promoteAlternateEmail({
      userId,
      alternateEmailId,
    });

    log(`Successfully made email primary: ${response.result.email}`);

    setOutput(outputVariable, response.result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error('User or alternate email not found');
    } else if (error.statusCode === 403) {
      throw new Error(
        'Permission denied. System administrator access required.',
      );
    } else if (error.statusCode === 400) {
      throw new Error('Email must be confirmed before it can be made primary');
    } else {
      throw new Error(`Failed to make email primary: ${errorMessage}`);
    }
  }
};
