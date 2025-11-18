import { UpdateUserInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<UpdateUserInputs>) => {
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
