import { SearchSheetsInputs } from './type';
import { smartsheetApiRequest } from '../api-client';
import { IHandlerContext } from '../type';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: IHandlerContext<SearchSheetsInputs>) => {
  const { sheetId, query, outputVariable } = inputs;

  // Validate required inputs
  if (!query) {
    throw new Error('Search query is required');
  }

  if (sheetId) {
    log(`Searching for "${query}" in sheet ${sheetId}`);
  } else {
    log(`Searching for "${query}" across all sheets`);
  }

  try {
    let response;

    if (sheetId) {
      // Search within a specific sheet
      response = await smartsheetApiRequest({
        method: 'GET',
        path: `/search/sheets/${sheetId}`,
        queryParams: {
          query,
        },
      });
    } else {
      // Search across all sheets
      response = await smartsheetApiRequest({
        method: 'GET',
        path: '/search/sheets',
        queryParams: {
          query,
        },
      });
    }

    const totalResults = (response as any).totalCount || 0;
    log(`Found ${totalResults} result(s)`);

    // Set output variable
    setOutput(outputVariable, {
      query,
      totalCount: totalResults,
      results: (response as any).results || [],
    });
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (errorMessage.includes('404') || errorMessage.includes('Not Found')) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the sheet ID.`,
      );
    } else if (
      errorMessage.includes('403') ||
      errorMessage.includes('Access denied')
    ) {
      throw new Error(
        `Access denied. You may not have permission to search this content.`,
      );
    } else if (
      errorMessage.includes('400') ||
      errorMessage.includes('Invalid')
    ) {
      throw new Error(
        `Invalid search query: ${errorMessage}. Check your search parameters.`,
      );
    } else {
      throw new Error(`Search failed: ${errorMessage}`);
    }
  }
};
