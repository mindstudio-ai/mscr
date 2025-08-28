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
  // Extract inputs
  const { blockIdOrUrl, outputVariable } = inputs;

  // Validate required environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error('Missing Notion authentication token');
  }

  // Extract block ID from URL or use directly
  const blockId = extractBlockId(blockIdOrUrl);
  log(`Retrieving Notion block with ID: ${blockId}`);

  // Initialize Notion client
  const notion = new Client({
    auth: token,
  });

  try {
    // Retrieve block from Notion API
    const response = await notion.blocks.retrieve({
      block_id: blockId,
    });

    log(`Successfully retrieved block`);

    // Set the output variable with the block data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common API errors
    if (error.status === 404) {
      throw new Error(
        `Block not found or you don't have access to it: ${blockId}`,
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Failed to retrieve block: ${error.message || error}`);
    }
  }
};

/**
 * Extracts a block ID from a Notion URL or returns the input if it's already a valid block ID
 * Handles various Notion URL formats
 */
function extractBlockId(blockIdOrUrl: string): string {
  // Check if input is already a valid block ID (UUID format with or without dashes)
  const uuidRegex =
    /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;
  if (uuidRegex.test(blockIdOrUrl)) {
    // If it's a UUID without dashes, add them for the API
    if (!blockIdOrUrl.includes('-')) {
      return blockIdOrUrl.replace(
        /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i,
        '$1-$2-$3-$4-$5',
      );
    }
    return blockIdOrUrl;
  }

  // Extract block ID from URL
  // Notion URLs can contain block IDs in various formats
  const urlRegex =
    /([0-9a-f]{32}|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i;
  const match = blockIdOrUrl.match(urlRegex);

  if (match && match[1]) {
    const extractedId = match[1];
    // If extracted ID doesn't have dashes, add them
    if (!extractedId.includes('-')) {
      return extractedId.replace(
        /^([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})$/i,
        '$1-$2-$3-$4-$5',
      );
    }
    return extractedId;
  }

  // If we couldn't extract a valid block ID, return the original input
  // The Notion API will validate and return an appropriate error
  return blockIdOrUrl;
}
