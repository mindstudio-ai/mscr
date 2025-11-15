import smartsheet from 'smartsheet';
import { ListSheetsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: ListSheetsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { includeOwnerInfo, modifiedSince, outputVariable } = inputs;

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  log('Retrieving list of sheets from Smartsheet');

  try {
    // Build query parameters
    const options: any = {};

    if (includeOwnerInfo) {
      options.queryParameters = { include: 'ownerInfo' };
    }

    if (modifiedSince) {
      if (!options.queryParameters) {
        options.queryParameters = {};
      }
      options.queryParameters.modifiedSince = modifiedSince;
    }

    // Get list of sheets
    const response = await client.sheets.listSheets(options);

    log(`Successfully retrieved ${response.data.length} sheets`);

    // Set output variable
    setOutput(outputVariable, {
      totalCount: response.totalCount,
      sheets: response.data,
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';
    throw new Error(`Failed to list sheets: ${errorMessage}`);
  }
};
