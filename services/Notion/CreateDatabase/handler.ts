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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Notion authentication token');
  }

  const {
    parentPageId,
    databaseTitle,
    propertiesDefinition,
    iconEmoji,
    coverImageUrl,
    outputVariable,
  } = inputs;

  // Parse the parent page ID from URL or use as is
  const pageId = parsePageId(parentPageId);
  log(`Creating database in parent page: ${pageId}`);

  // Initialize Notion client
  const notion = new Client({ auth: token });

  // Prepare the request payload
  const payload: any = {
    parent: {
      type: 'page_id',
      page_id: pageId,
    },
    title: [
      {
        type: 'text',
        text: {
          content: databaseTitle,
          link: null,
        },
      },
    ],
    properties: propertiesDefinition,
  };

  // Add icon if provided
  if (iconEmoji) {
    payload.icon = {
      type: 'emoji',
      emoji: iconEmoji,
    };
    log(`Using emoji icon: ${iconEmoji}`);
  }

  // Add cover image if provided
  if (coverImageUrl) {
    payload.cover = {
      type: 'external',
      external: {
        url: coverImageUrl,
      },
    };
    log(`Using cover image from: ${coverImageUrl}`);
  }

  try {
    // Create the database
    log(
      `Creating database "${databaseTitle}" with ${Object.keys(propertiesDefinition).length} properties...`,
    );
    const response = await notion.databases.create(payload);

    log(`Database created successfully! Access it at: ${response.id}`);

    // Set the output variable with the created database information
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common errors with user-friendly messages
    if (error.status === 404) {
      throw new Error(
        `Parent page not found. Please check that the page ID is correct and that your integration has access to it.`,
      );
    } else if (error.status === 403) {
      throw new Error(
        `Permission denied. Make sure your integration has 'insert content' capabilities and access to the parent page.`,
      );
    } else {
      throw new Error(`Failed to create database: ${error.message}`);
    }
  }
};

/**
 * Extracts the page ID from a Notion URL or returns the ID if already in correct format
 *
 * @param input A Notion URL or page ID
 * @returns The extracted page ID
 */
function parsePageId(input: string): string {
  // Check if input is a URL
  if (input.includes('notion.so')) {
    // Extract the ID from the URL
    // Notion URLs can have the format:
    // https://www.notion.so/workspace/98ad959b2b6a477480ee00246fb0ea9b
    // or
    // https://www.notion.so/98ad959b2b6a477480ee00246fb0ea9b

    // Get the last part of the URL and remove any query parameters
    const parts = input.split('/');
    const lastPart = parts[parts.length - 1].split('?')[0];

    // If the last part contains dashes, it's likely already in the correct format
    if (lastPart.includes('-')) {
      return lastPart;
    }

    // Otherwise, it might be in the format without dashes
    // Convert to the format with dashes (required by the API)
    if (lastPart.length === 32) {
      return (
        lastPart.slice(0, 8) +
        '-' +
        lastPart.slice(8, 12) +
        '-' +
        lastPart.slice(12, 16) +
        '-' +
        lastPart.slice(16, 20) +
        '-' +
        lastPart.slice(20)
      );
    }

    return lastPart;
  }

  // If not a URL, return as is (assuming it's already a page ID)
  return input;
}
