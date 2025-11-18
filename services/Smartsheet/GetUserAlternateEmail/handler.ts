import { GetUserAlternateEmailInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetUserAlternateEmailInputs>) => {
  const { userId, alternateEmailId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!alternateEmailId) {
    throw new Error('Alternate email ID is required');
  }

  try {
    log(`Retrieving alternate email ${alternateEmailId} for user ${userId}...`);

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: `/users/${userId}/alternateemails/${alternateEmailId}`,
    });

    log(`Successfully retrieved alternate email: ${(result as any).email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting alternate email: ${error.message}`);
    throw error;
  }
};
