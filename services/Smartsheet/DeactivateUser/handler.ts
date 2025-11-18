import { DeactivateUserInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<DeactivateUserInputs>) => {
  const { userId, outputVariable } = inputs;
  if (!userId) {
    throw new Error('userId is required');
  }
  const path = `/users/${userId}/deactivate`;

  const requestOptions: Record<string, any> = {
    method: 'POST',
    path,
  };

  const response = await smartsheetApiRequest(requestOptions);
  setOutput(outputVariable, response);
};
