import { ListUserAlternateEmailsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListUserAlternateEmailsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
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
