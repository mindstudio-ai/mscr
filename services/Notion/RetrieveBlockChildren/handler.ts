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
    throw new Error('Missing Notion authentication token');
  }

  const { blockIdOrUrl, pageSize, startCursor, outputVariable } = inputs;

  if (!blockIdOrUrl) {
    throw new Error('Block ID or URL is required');
  }

  // Extract block ID from URL or use the provided ID
  const blockId = extractBlockId(blockIdOrUrl);

  log(`Retrieving children for block: ${blockId}`);

  // Initialize Notion client
  const notion = new Client({
    auth: token,
  });

  try {
    // Prepare request parameters
    const requestParams: any = {
      block_id: blockId,
    };

    // Add optional pagination parameters if provided
    if (pageSize) {
      requestParams.page_size = parseInt(pageSize, 10);
    }

    if (startCursor) {
      requestParams.start_cursor = startCursor;
    }

    // Make the API request
    const response = await notion.blocks.children.list(requestParams);

    log(`Successfully retrieved ${response.results.length} block children`);

    // If there's more content available, let the user know
    if (response.has_more) {
      log(
        `There are more blocks available. Use the next_cursor value for pagination: ${response.next_cursor}`,
      );
    }

    // Set the output variable with the full response
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common error cases with user-friendly messages
    if (error.status === 404) {
      throw new Error(
        `Block not found or you don't have access to it. Please check the block ID and your permissions.`,
      );
    } else if (error.status === 400) {
      throw new Error(`Invalid request: ${error.message}`);
    } else if (error.status === 429) {
      throw new Error(`Rate limit exceeded. Please try again later.`);
    } else {
      throw new Error(`Error retrieving block children: ${error.message}`);
    }
  }
};

/**
 * Extracts a block ID from either a direct ID or a Notion URL
 *
 * @param blockIdOrUrl - A Notion block ID or URL containing a block ID
 * @returns The extracted block ID
 */
function extractBlockId(blockIdOrUrl: string): string {
  // Check if input is already a UUID format (likely a direct block ID)
  const uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (uuidPattern.test(blockIdOrUrl)) {
    return blockIdOrUrl;
  }

  // Try to extract block ID from URL
  // Notion URLs can have the format: https://www.notion.so/Page-Title-blockId
  // or https://www.notion.so/blockId
  try {
    // Extract the last part of the URL path which may contain the block ID
    const urlParts = new URL(blockIdOrUrl).pathname.split('-');
    const lastPart = urlParts[urlParts.length - 1];

    // Check if the last part is a valid UUID
    if (uuidPattern.test(lastPart)) {
      return lastPart;
    }

    // If not, try to find the UUID pattern within the URL
    const matches = blockIdOrUrl.match(
      /([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i,
    );
    if (matches && matches[1]) {
      return matches[1];
    }
  } catch (error) {
    // If URL parsing fails, continue to the error below
  }

  throw new Error(
    'Invalid block ID or URL. Please provide a valid Notion block ID or a Notion URL containing a block ID.',
  );
}
