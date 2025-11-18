import { ListAlternateEmailsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListAlternateEmailsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { userId, outputVariable } = inputs;

  if (!userId) {
    throw new Error('User ID is required');
  }

  log(`Retrieving alternate emails for user: ${userId}`);

  try {
    const response = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: `/users/${userId}/alternateemails`,
    });

    const data = (response as any).data || response;
    const totalCount =
      (response as any).totalCount || (Array.isArray(data) ? data.length : 0);

    log(`Successfully retrieved ${totalCount} alternate email(s)`);

    setOutput(outputVariable, {
      totalCount,
      alternateEmails: data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(`User not found: ${userId}`);
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Permission denied')
    ) {
      throw new Error(
        'Permission denied. You must be a system administrator to view alternate emails.',
      );
    } else {
      throw new Error(`Failed to list alternate emails: ${errorMessage}`);
    }
  }
};
