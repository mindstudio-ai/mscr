import { Client } from '@notionhq/client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Notion API token. Please check your connection settings.',
    );
  }

  // Extract and validate inputs
  const {
    query = '',
    filterType,
    sortDirection = 'descending',
    pageSize = '10',
    startCursor = '',
    outputVariable,
  } = inputs;

  // Initialize the Notion client
  const notion = new Client({
    auth: token,
  });

  // Prepare search parameters
  const searchParams: any = {
    query: query,
    sort: {
      direction: sortDirection,
      timestamp: 'last_edited_time',
    },
    page_size: parseInt(pageSize, 10) || 10,
  };

  // Add filter if specified
  if (filterType) {
    searchParams.filter = {
      value: filterType,
      property: 'object',
    };
  }

  // Add start cursor for pagination if provided
  if (startCursor) {
    searchParams.start_cursor = startCursor;
  }

  try {
    log(`Searching Notion for "${query || 'all items'}"...`);

    // Execute the search
    const response = await notion.search(searchParams);

    // Log results summary
    const resultCount = response.results.length;
    log(`Found ${resultCount} result${resultCount !== 1 ? 's' : ''}`);

    if (response.has_more) {
      log(
        'More results are available. Use the next_cursor value for pagination.',
      );
    }

    // Set the output variable with the complete response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common errors
    if (error.status === 401) {
      throw new Error(
        'Authentication failed. Please check your Notion API token.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(
        `Notion search failed: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
