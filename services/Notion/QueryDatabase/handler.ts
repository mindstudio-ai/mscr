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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Notion API token');
  }

  // Extract inputs
  const {
    databaseId: rawDatabaseId,
    filter,
    sorts,
    pageSize,
    startCursor,
    filterProperties,
    outputVariable,
  } = inputs;

  // Parse database ID from URL or use as is
  const databaseId = parseNotionDatabaseId(rawDatabaseId);
  if (!databaseId) {
    throw new Error('Invalid database ID or URL');
  }

  log(`Querying Notion database: ${databaseId}`);

  // Initialize the Notion client
  const notion = new Client({
    auth: token,
  });

  // Prepare query parameters
  const queryParams: any = {
    database_id: databaseId,
  };

  // Add optional parameters if provided
  if (filter) {
    queryParams.filter = filter;
  }

  if (sorts) {
    queryParams.sorts = sorts;
  }

  if (pageSize) {
    const parsedPageSize = parseInt(pageSize, 10);
    if (!isNaN(parsedPageSize)) {
      queryParams.page_size = Math.min(parsedPageSize, 100); // Ensure it doesn't exceed the max of 100
    }
  }

  if (startCursor) {
    queryParams.start_cursor = startCursor;
  }

  if (filterProperties) {
    // Convert comma-separated string to array
    queryParams.filter_properties = filterProperties
      .split(',')
      .map((prop) => prop.trim())
      .filter((prop) => prop.length > 0);
  }

  try {
    log('Sending request to Notion API...');
    const response = await notion.databases.query(queryParams);

    log(`Retrieved ${response.results.length} results from the database`);

    // Set the output variable with the query results
    setOutput(outputVariable, response);
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(
        'Database not found or not shared with the integration. Make sure to share the database with your integration in Notion.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Notion API error: ${error.message || 'Unknown error'}`);
    }
  }
};

/**
 * Parses a Notion database ID from either a raw ID or a Notion URL
 *
 * @param input Raw database ID or Notion URL
 * @returns Parsed database ID or null if invalid
 */
function parseNotionDatabaseId(input: string): string | null {
  if (!input) {
    return null;
  }

  // Check if it's already a valid ID format (32 characters with optional dashes)
  const cleanId = input.replace(/-/g, '');
  if (/^[a-zA-Z0-9]{32}$/.test(cleanId)) {
    // Return with dashes if they were in the original, otherwise without
    return input.length === 32
      ? input
      : cleanId.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
  }

  // Try to extract ID from URL
  try {
    const url = new URL(input);
    // Extract the last path segment and remove any query parameters
    const pathSegments = url.pathname
      .split('/')
      .filter((segment) => segment.length > 0);
    const lastSegment = pathSegments[pathSegments.length - 1];

    // Check if the last segment contains a valid ID (with or without dashes)
    if (lastSegment && lastSegment.replace(/-/g, '').length === 32) {
      return lastSegment
        .replace(/-/g, '')
        .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    }

    // Some Notion URLs have the ID in the second-to-last segment
    if (pathSegments.length > 1) {
      const potentialId = pathSegments[pathSegments.length - 2];
      if (potentialId && potentialId.replace(/-/g, '').length === 32) {
        return potentialId
          .replace(/-/g, '')
          .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
      }
    }
  } catch (e) {
    // Not a valid URL, continue to next check
  }

  return null;
}
