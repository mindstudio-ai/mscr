import smartsheet from 'smartsheet';
import { UpdateUserInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: UpdateUserInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    userId,
    admin,
    licensedSheetCreator,
    firstName,
    lastName,
    outputVariable,
  } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Updating user ${userId}...`);

    const userSpec: any = {};

    if (admin !== undefined) {
      userSpec.admin = admin;
    }
    if (licensedSheetCreator !== undefined) {
      userSpec.licensedSheetCreator = licensedSheetCreator;
    }
    if (firstName) {
      userSpec.firstName = firstName;
    }
    if (lastName) {
      userSpec.lastName = lastName;
    }

    const result = await client.users.updateUser({
      userId,
      body: userSpec,
    });

    log(`Successfully updated user: ${userId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error updating user: ${error.message}`);
    throw error;
  }
};
