import { AddUserAlternateEmailInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddUserAlternateEmailInputs>) => {
  const { userId, email, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!email) {
    throw new Error('Email is required');
  }

  try {
    log(`Adding alternate email ${email} for user ${userId}...`);

    const result = await smartsheetApiRequest({
      method: 'POST',
      path: `/users/${userId}/alternateemails`,
      body: [{ email }],
    });

    log(`Successfully added alternate email: ${email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error adding alternate email: ${error.message}`);
    throw error;
  }
};
