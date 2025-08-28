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

  // Extract inputs
  const { blockId, pageSize, startCursor, outputVariable } = inputs;

  if (!blockId) {
    throw new Error('Block ID is required');
  }

  // Initialize the Notion client
  const notion = new Client({ auth: token });

  // Parse the block ID from URL if needed
  const parsedBlockId = parseBlockId(blockId);
  log(`Retrieving comments for block: ${parsedBlockId}`);

  // Prepare request parameters
  const requestParams: any = {
    block_id: parsedBlockId,
  };

  // Add optional parameters if provided
  if (pageSize) {
    const size = parseInt(pageSize, 10);
    if (!isNaN(size) && size > 0 && size <= 100) {
      requestParams.page_size = size;
    } else {
      log('Invalid page size. Using default value of 100.');
    }
  }

  if (startCursor) {
    requestParams.start_cursor = startCursor;
  }

  try {
    // Call the Notion API to list comments
    log('Fetching comments from Notion...');
    const response = await notion.comments.list(requestParams);

    log(`Retrieved ${response.results.length} comments`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.status === 404) {
      throw new Error(
        `Block not found: ${parsedBlockId}. Please check if the block ID is correct.`,
      );
    } else if (error.status === 403) {
      throw new Error(
        'Access denied. Make sure your integration has comment capabilities enabled.',
      );
    } else {
      throw new Error(`Failed to retrieve comments: ${error.message}`);
    }
  }
};

/**
 * Parses a block ID from a Notion URL or returns the ID if already in the correct format
 *
 * @param blockIdOrUrl - A Notion block ID or URL containing the ID
 * @returns The extracted block ID
 */
function parseBlockId(blockIdOrUrl: string): string {
  // Check if it's a URL
  if (blockIdOrUrl.startsWith('http')) {
    try {
      // Extract the last part of the URL path which usually contains the ID
      const url = new URL(blockIdOrUrl);
      const pathParts = url.pathname.split('/').filter(Boolean);

      // The ID is typically the last segment in the path
      if (pathParts.length > 0) {
        const lastPart = pathParts[pathParts.length - 1];
        // Notion IDs are typically 32 characters with hyphens
        // If the last part contains a hyphen and is long enough, it's likely the ID
        if (lastPart.includes('-') && lastPart.length >= 32) {
          return lastPart;
        }
      }
    } catch (error) {
      // If URL parsing fails, fall back to using the original input
      log('Could not parse URL. Using the provided value as block ID.');
    }
  }

  // Return the original input if it's not a URL or if URL parsing failed
  return blockIdOrUrl;
}
