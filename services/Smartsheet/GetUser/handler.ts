import { GetUserInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetUserInputs>) => {
  const { userId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    log(`Retrieving user ${userId}...`);
    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/users/${userId}`,
    });

    log(`Successfully retrieved user ${userId}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting user: ${error.message}`);
    throw error;
  }
};
