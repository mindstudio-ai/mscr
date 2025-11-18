import { UpdateUserInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

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

    const result = await smartsheetApiRequest({
      method: 'PUT',
      path: `/users/${userId}`,
      body: userSpec,
    });

    log(`Successfully updated user: ${userId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error updating user: ${error.message}`);
    throw error;
  }
};
