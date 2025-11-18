import { AddUserInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: AddUserInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    email,
    firstName,
    lastName,
    admin,
    licensedSheetCreator,
    sendEmail,
    outputVariable,
  } = inputs;

  if (!email) {
    throw new Error('Email is required');
  }

  try {
    log(`Adding user ${email}...`);

    const queryParams: Record<string, boolean> = {};
    if (sendEmail !== undefined) {
      queryParams.sendEmail = sendEmail;
    }

    const userSpec: any = {
      email,
    };

    if (firstName) {
      userSpec.firstName = firstName;
    }
    if (lastName) {
      userSpec.lastName = lastName;
    }
    if (admin !== undefined) {
      userSpec.admin = admin;
    }
    if (licensedSheetCreator !== undefined) {
      userSpec.licensedSheetCreator = licensedSheetCreator;
    }

    const result = await smartsheetApiRequest({
      method: 'POST',
      path: '/users',
      queryParams,
      body: userSpec,
    });

    log(`Successfully added user: ${email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error adding user: ${error.message}`);
    throw error;
  }
};
