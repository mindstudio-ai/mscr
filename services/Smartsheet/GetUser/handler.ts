import { GetUserInputs } from './type';
import { BASE_URL } from '../constants';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<GetUserInputs>) => {
  const { userId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }
  const url = `${BASE_URL}/users/${userId}`;

  try {
    log(`Retrieving user ${userId}...`);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = await response.json();

    // Check for errors
    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          'Authentication failed. Please check your API Key and Account URL.',
        );
      }

      const errorMessage =
        result.message || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    log(`Successfully retrieved user: ${JSON.stringify(result, null, 2)}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error getting user: ${error.message}`);
    throw error;
  }
};
