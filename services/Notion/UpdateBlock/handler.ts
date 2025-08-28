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
  // Extract the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Notion API token. Please check your connection settings.',
    );
  }

  // Initialize the Notion client
  const notion = new Client({ auth: token });

  // Extract inputs
  const {
    blockIdOrUrl,
    blockType,
    content,
    color = 'default',
    isToggleable,
    checked,
    language,
    emoji,
    bold,
    italic,
    strikethrough,
    underline,
    code,
    archived,
    outputVariable,
  } = inputs;

  // Parse block ID from input (which could be a URL or direct ID)
  const blockId = extractBlockId(blockIdOrUrl);
  if (!blockId) {
    throw new Error(
      'Invalid block ID or URL. Please provide a valid Notion block ID or URL.',
    );
  }

  log(`Updating Notion block with ID: ${blockId}`);

  // Create text annotations based on formatting options
  const annotations = {
    bold: bold === 'true',
    italic: italic === 'true',
    strikethrough: strikethrough === 'true',
    underline: underline === 'true',
    code: code === 'true',
    color,
  };

  // Create the rich text array with content and annotations
  const richText = [
    {
      type: 'text',
      text: { content },
      annotations,
    },
  ];

  // Create the update payload based on block type
  const updatePayload: any = {
    block_id: blockId,
  };

  // Set archived status if provided
  if (archived !== undefined) {
    updatePayload.archived = archived === 'true';
  }

  // Configure block content based on block type
  switch (blockType) {
    case 'paragraph':
      updatePayload.paragraph = { rich_text: richText };
      break;
    case 'heading_1':
    case 'heading_2':
    case 'heading_3':
      updatePayload[blockType] = {
        rich_text: richText,
        ...(isToggleable !== undefined && {
          is_toggleable: isToggleable === 'true',
        }),
      };
      break;
    case 'bulleted_list_item':
    case 'numbered_list_item':
    case 'quote':
      updatePayload[blockType] = { rich_text: richText };
      break;
    case 'to_do':
      updatePayload.to_do = {
        rich_text: richText,
        ...(checked !== undefined && { checked: checked === 'true' }),
      };
      break;
    case 'code':
      updatePayload.code = {
        rich_text: richText,
        language: language || 'plain text',
      };
      break;
    case 'callout':
      updatePayload.callout = {
        rich_text: richText,
        icon: emoji ? { type: 'emoji', emoji } : undefined,
      };
      break;
    default:
      throw new Error(`Unsupported block type: ${blockType}`);
  }

  try {
    // Make the API call to update the block
    const response = await notion.blocks.update(updatePayload);
    log('Block updated successfully');

    // Set the output variable with the updated block information
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.status === 404) {
      throw new Error(
        'Block not found. Please check if the block ID is correct and that you have access to it.',
      );
    } else if (error.status === 403) {
      throw new Error(
        'Permission denied. Make sure your integration has the necessary permissions.',
      );
    } else {
      throw new Error(
        `Failed to update block: ${error.message || 'Unknown error'}`,
      );
    }
  }
};

/**
 * Extracts a block ID from either a direct ID or a Notion URL
 * @param blockIdOrUrl - The block ID or URL containing the block ID
 * @returns The extracted block ID or null if invalid
 */
function extractBlockId(blockIdOrUrl: string): string | null {
  // If it's already a valid UUID format, return it directly
  if (
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
      blockIdOrUrl,
    )
  ) {
    return blockIdOrUrl;
  }

  // Try to extract block ID from URL
  // Notion block URLs can have formats like:
  // https://www.notion.so/workspace/My-Page-83715d7c9579422db796d4a21a89e4ca#9bc30ad49373-46a5-84ab-0a7845ee52e6
  try {
    const url = new URL(blockIdOrUrl);

    // Check for block ID in hash
    if (url.hash && url.hash.length > 1) {
      const hashId = url.hash.substring(1); // Remove the # character
      if (/^[a-f0-9-]+$/i.test(hashId)) {
        return (
          hashId
            .replace(/[-]/g, '')
            .match(/.{8}|.{4}|.{4}|.{4}|.{12}/g)
            ?.join('-') || null
        );
      }
    }

    // Check for block ID in pathname
    const pathMatch = url.pathname.match(/([a-f0-9]{32})/i);
    if (pathMatch) {
      const pathId = pathMatch[1];
      return pathId.match(/.{8}|.{4}|.{4}|.{4}|.{12}/g)?.join('-') || null;
    }
  } catch (e) {
    // Not a valid URL, continue to other checks
  }

  // Check if it's a UUID without dashes
  if (/^[a-f0-9]{32}$/i.test(blockIdOrUrl)) {
    return blockIdOrUrl.match(/.{8}|.{4}|.{4}|.{4}|.{12}/g)?.join('-') || null;
  }

  // If we couldn't extract a valid block ID, return null
  return null;
}
