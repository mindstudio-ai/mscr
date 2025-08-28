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
  // Get the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Notion authentication token');
  }

  const { blockId, outputVariable } = inputs;
  if (!blockId) {
    throw new Error('Block ID is required');
  }

  // Extract block ID from URL if a URL is provided
  const extractedBlockId = extractBlockId(blockId);
  log(`Preparing to delete Notion block: ${extractedBlockId}`);

  // Initialize the Notion client
  const notion = new Client({
    auth: token,
  });

  try {
    // Make the API request to delete (archive) the block
    const response = await notion.blocks.delete({
      block_id: extractedBlockId,
    });

    log(`Block successfully moved to trash`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle specific error cases with user-friendly messages
    if (error.status === 404) {
      throw new Error("Block not found or you don't have access to it");
    } else if (error.status === 403) {
      throw new Error(
        'Your integration lacks permission to update content in Notion',
      );
    } else if (error.status === 400 || error.status === 429) {
      throw new Error('Request limit exceeded or invalid request');
    } else {
      // Generic error handling
      throw new Error(
        `Failed to delete Notion block: ${error.message || 'Unknown error'}`,
      );
    }
  }
};

/**
 * Extracts a block ID from either a raw ID or a Notion URL
 *
 * @param input - Block ID or URL containing the block ID
 * @returns Extracted block ID
 */
function extractBlockId(input: string): string {
  // If input is a URL, extract the ID
  if (input.startsWith('http')) {
    // Extract the last path segment which should contain the ID
    const pathSegments = input.split('/');
    const lastSegment = pathSegments[pathSegments.length - 1];

    // If the last segment contains a hyphen, it's likely a page title with ID
    if (lastSegment.includes('-')) {
      const idPart = lastSegment.split('-').pop();
      return idPart || lastSegment;
    }

    // Otherwise, use the last segment as is
    return lastSegment;
  }

  // Remove any hyphens if present (Notion IDs can be with or without hyphens)
  return input.replace(/-/g, '');
}
