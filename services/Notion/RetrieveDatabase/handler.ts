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
  const { databaseId: rawDatabaseId, outputVariable } = inputs;
  const { token } = process.env;

  if (!token) {
    throw new Error(
      'Missing Notion API token. Please check your connection settings.',
    );
  }

  if (!rawDatabaseId) {
    throw new Error('Database ID is required');
  }

  // Extract database ID from URL or use as is
  const databaseId = extractDatabaseId(rawDatabaseId);

  log(`Retrieving database information for ID: ${databaseId}`);

  // Initialize the Notion client
  const notion = new Client({
    auth: token,
  });

  try {
    // Retrieve the database
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });

    log('Successfully retrieved database information');

    // Set the output variable with the database information
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common error cases
    if (error.status === 404) {
      throw new Error(
        'Database not found. Please check the database ID and ensure it is shared with your integration.',
      );
    } else if (error.status === 403) {
      throw new Error(
        'Access denied. Please ensure the database is shared with your integration.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(
        `Failed to retrieve database: ${error.message || 'Unknown error'}`,
      );
    }
  }
};

/**
 * Extracts the database ID from a Notion URL or returns the ID if already in correct format
 *
 * @param input A Notion database ID or URL
 * @returns The extracted database ID
 */
function extractDatabaseId(input: string): string {
  // If input is already a 32-character ID (with or without dashes)
  if (/^[a-zA-Z0-9]{32}$/.test(input.replace(/-/g, ''))) {
    return input;
  }

  // Try to extract ID from URL
  try {
    // Match the ID pattern in various Notion URL formats
    const urlMatch = input.match(
      /([a-zA-Z0-9]{32})|([a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})/,
    );

    if (urlMatch && urlMatch[0]) {
      return urlMatch[0].replace(/-/g, '');
    }

    throw new Error(
      'Could not extract a valid database ID from the provided input',
    );
  } catch (error) {
    throw new Error(
      'Invalid database ID format. Please provide a valid Notion database ID or URL.',
    );
  }
}
