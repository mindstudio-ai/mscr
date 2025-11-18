import { AddAlternateEmailInputs } from './type';
import { IHandlerContext } from '../type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<AddAlternateEmailInputs>) => {
  const { userId, email, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  if (!email) {
    throw new Error('Email address is required');
  }

  log(`Adding alternate email ${email} for user: ${userId}`);

  try {
    const response = await smartsheetApiRequest({
      method: 'POST',
      path: `/users/${userId}/alternateemails`,
      body: [{ email }],
    });

    const result = Array.isArray(response) ? response[0] : response;
    log(`Successfully added alternate email with ID: ${(result as any).id}`);

    setOutput(outputVariable, result);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(`User not found: ${userId}`);
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission')
    ) {
      throw new Error(
        'Permission denied. You must be a system administrator to add alternate emails.',
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(`Invalid email address: ${errorMessage}`);
    } else {
      throw new Error(`Failed to add alternate email: ${errorMessage}`);
    }
  }
};
