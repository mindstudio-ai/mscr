import { ListUserAlternateEmailsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<ListUserAlternateEmailsInputs>) => {
  const { userId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  try {
    log(`Listing alternate emails for user ${userId}...`);

    const result = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/users/${userId}/alternateemails`,
    });

    const totalCount =
      (result as any).totalCount || (result as any).data?.length || 0;
    log(`Successfully retrieved ${totalCount} alternate emails`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing alternate emails: ${error.message}`);
    throw error;
  }
};
