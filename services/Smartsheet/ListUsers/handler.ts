import { ListUsersInputs } from './type';
import { smartsheetApiRequest } from '../api-client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListUsersInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    email,
    includeAll,
    numericDates,
    page,
    pageSize,
    include,
    modifiedSince,
    outputVariable,
  } = inputs;

  try {
    log('Listing users in organization...');

    const queryParams: Record<string, string | number | boolean> = {};
    if (email) {
      queryParams.email = email;
    }
    if (includeAll !== undefined) {
      queryParams.includeAll = includeAll;
    }
    if (numericDates !== undefined) {
      queryParams.numericDates = numericDates;
    }
    if (page !== undefined) {
      queryParams.page = page;
    }
    if (pageSize !== undefined) {
      queryParams.pageSize = pageSize;
    }
    if (include) {
      queryParams.include = include;
    }
    if (modifiedSince) {
      queryParams.modifiedSince = modifiedSince;
    }

    log(`Listing users with options: ${JSON.stringify(queryParams)}`);

    const result = await smartsheetApiRequest<{
      data: any[];
      totalCount?: number;
    }>({
      method: 'GET',
      path: '/users',
      queryParams,
    });

    const totalCount =
      (result as any).totalCount || (result as any).data?.length || 0;
    log(`Successfully retrieved ${totalCount} users`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing users: ${error.message}`);
    throw error;
  }
};
