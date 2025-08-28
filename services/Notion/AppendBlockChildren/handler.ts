import { Client } from '@notionhq/client';

export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Get the token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Notion token. Please check your connection settings.',
    );
  }

  // Extract inputs
  const { blockId: rawBlockId, blocks, afterBlockId, outputVariable } = inputs;

  // Parse block ID from URL if needed
  const blockId = extractBlockId(rawBlockId);
  log(`Preparing to append blocks to Notion block: ${blockId}`);

  // Initialize Notion client
  const notion = new Client({ auth: token });

  try {
    // Validate blocks input
    if (!Array.isArray(blocks)) {
      throw new Error('Blocks must be an array of Notion block objects');
    }

    if (blocks.length > 100) {
      throw new Error('Notion API limits requests to 100 blocks per call');
    }

    // Prepare request parameters
    const requestParams: any = {
      block_id: blockId,
      children: blocks,
    };

    // Add optional afterBlockId if provided
    if (afterBlockId) {
      requestParams.after = afterBlockId;
      log(`Blocks will be appended after block: ${afterBlockId}`);
    }

    // Make the API call to append blocks
    log('Sending request to Notion API...');
    const response = await notion.blocks.children.append(requestParams);

    // Set the output variable with the response
    log(`Successfully appended ${response.results.length} blocks to Notion`);
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle errors with user-friendly messages
    if (error.status === 404) {
      throw new Error(
        `Block not found or you don't have access to it: ${blockId}`,
      );
    } else if (error.status === 400) {
      throw new Error(`Invalid request: ${error.message}`);
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Error appending blocks: ${error.message}`);
    }
  }
};

/**
 * Extracts a block ID from either a raw ID or a Notion URL
 *
 * @param input - Block ID or Notion URL
 * @returns Extracted block ID
 */
function extractBlockId(input: string): string {
  // Check if input is a URL
  if (input.startsWith('http')) {
    // Extract the last part of the URL which typically contains the ID
    const urlParts = input.split('/');
    const lastPart = urlParts[urlParts.length - 1];

    // If the last part contains a dash, it's likely a page title with ID
    if (lastPart.includes('-')) {
      // The ID is the last part after the last dash
      return lastPart.split('-').pop() || input;
    }

    // Otherwise, use the last part of the URL
    return lastPart;
  }

  // If not a URL, return the input as is
  return input;
}
