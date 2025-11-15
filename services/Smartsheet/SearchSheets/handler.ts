import smartsheet from 'smartsheet';
import { SearchSheetsInputs } from './type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: SearchSheetsInputs;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  const { searchQuery, sheetId, outputVariable } = inputs;

  // Validate required inputs
  if (!searchQuery) {
    throw new Error('Search query is required');
  }

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  if (sheetId) {
    log(`Searching for "${searchQuery}" in sheet ${sheetId}`);
  } else {
    log(`Searching for "${searchQuery}" across all sheets`);
  }

  try {
    let response;

    if (sheetId) {
      // Search within a specific sheet
      response = await client.search.searchSheet({
        sheetId,
        queryParameters: {
          query: searchQuery,
        },
      });
    } else {
      // Search across all sheets
      response = await client.search.searchAll({
        queryParameters: {
          query: searchQuery,
        },
      });
    }

    const totalResults = response.totalCount || 0;
    log(`Found ${totalResults} result(s)`);

    // Set output variable
    setOutput(outputVariable, {
      query: searchQuery,
      totalCount: totalResults,
      results: response.results || [],
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the sheet ID.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Access denied. You may not have permission to search this content.`,
      );
    } else if (error.statusCode === 400) {
      throw new Error(
        `Invalid search query: ${errorMessage}. Check your search parameters.`,
      );
    } else {
      throw new Error(`Search failed: ${errorMessage}`);
    }
  }
};
