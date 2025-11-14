import smartsheet from 'smartsheet';
import { ListUsersQueryParameters } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListUsersQueryParameters & { outputVariable: string };
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const {
    email,
    includeAll,
    numericDates,
    planId,
    seatType,
    page,
    pageSize,
    include,
    outputVariable,
  } = inputs;

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log('Listing users in organization...');

    const options: Partial<ListUsersQueryParameters> = {};
    if (email) {
      options.email = email;
    }
    if (includeAll) {
      options.includeAll = true;
    }
    if (numericDates) {
      options.numericDates = true;
    }
    if (planId) {
      options.planId = planId;
    }
    if (seatType) {
      options.seatType = seatType;
    }
    if (page) {
      options.page = page;
    }
    if (pageSize) {
      options.pageSize = pageSize;
    }
    if (include) {
      options.include = include;
    }

    log(`Listing users with options: ${JSON.stringify(options)}`);

    const result = await client.users.listAllUsers(options);

    log(`Successfully retrieved ${result.totalCount} users`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error listing users: ${error.message}`);
    throw error;
  }
};
