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
  const { commentIdOrUrl, outputVariable } = inputs;

  // Validate required environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Notion API token. Please check your connection settings.',
    );
  }

  // Extract comment ID from URL or use directly provided ID
  let commentId = commentIdOrUrl;

  // Check if input is a URL and extract the comment ID
  if (
    commentIdOrUrl.includes('notion.so') ||
    commentIdOrUrl.startsWith('http')
  ) {
    log('Detected a Notion URL. Attempting to extract comment ID...');
    try {
      // Extract the comment ID from the URL
      // This is a simplified approach - Notion URLs can have various formats
      const urlParts = commentIdOrUrl.split(/[/#?]/);
      for (const part of urlParts) {
        // Look for a part that matches the format of a Notion comment ID
        // Notion comment IDs are typically 32-36 characters with hyphens
        if (
          /^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i.test(
            part,
          ) ||
          /^[0-9a-f]{32}$/i.test(part)
        ) {
          commentId = part;
          log(`Extracted comment ID: ${commentId}`);
          break;
        }
      }

      if (commentId === commentIdOrUrl) {
        // If we couldn't extract an ID that looks like a Notion ID
        log(
          'Could not extract a valid comment ID from the URL. Using the provided value as is.',
        );
      }
    } catch (error) {
      log('Error parsing URL. Using the provided value as is.');
    }
  }

  // Initialize Notion client
  const notion = new Client({ auth: token });

  log(`Retrieving comment with ID: ${commentId}`);

  try {
    // Make the API call to retrieve the comment
    const response = await notion.comments.retrieve({
      comment_id: commentId,
    });

    log('Successfully retrieved comment');

    // Set the output variable with the comment data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common error scenarios
    if (error.status === 404) {
      throw new Error(
        `Comment not found. Please check if the comment ID is correct.`,
      );
    } else if (error.status === 403) {
      throw new Error(
        `Access denied. Make sure your integration has comment capabilities enabled.`,
      );
    } else if (error.status === 401) {
      throw new Error(
        `Authentication failed. Please check your Notion API token.`,
      );
    } else {
      throw new Error(
        `Failed to retrieve comment: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
