import { GetCurrentUserInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetCurrentUserInputs>) => {
  const { include, outputVariable } = inputs;

  try {
    log('Retrieving current user information...');

    const queryParams: Record<string, string> = {};
    if (include) {
      queryParams.include = include;
    }

    const result = await smartsheetApiRequest({
      method: 'GET',
      path: '/users/me',
      queryParams,
    });

    log(`Successfully retrieved current user: ${result?.email}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting current user: ${error.message}`);
    throw error;
  }
};
