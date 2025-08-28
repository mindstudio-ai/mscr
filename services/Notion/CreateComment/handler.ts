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

  const { pageId, discussionId, commentText, outputVariable } = inputs;

  // Validate that either pageId or discussionId is provided (but not both)
  if ((!pageId && !discussionId) || (pageId && discussionId)) {
    throw new Error(
      'You must provide either a Page ID or a Discussion ID, but not both',
    );
  }

  // Initialize Notion client
  const notion = new Client({ auth: token });

  // Parse page ID from URL if needed
  let parsedPageId = pageId;
  if (pageId && pageId.includes('notion.so')) {
    try {
      // Extract the page ID from a Notion URL
      // URL format: https://www.notion.so/{workspace}/{page-id}?{params}
      const url = new URL(pageId);
      const pathSegments = url.pathname.split('/').filter(Boolean);
      parsedPageId = pathSegments[pathSegments.length - 1];

      // If the ID contains dashes, it's already in the correct format
      // Otherwise, format it with dashes (32 chars, 8-4-4-4-12 format)
      if (!parsedPageId.includes('-') && parsedPageId.length === 32) {
        parsedPageId = [
          parsedPageId.substring(0, 8),
          parsedPageId.substring(8, 12),
          parsedPageId.substring(12, 16),
          parsedPageId.substring(16, 20),
          parsedPageId.substring(20),
        ].join('-');
      }

      log(`Extracted page ID: ${parsedPageId}`);
    } catch (error) {
      throw new Error(`Invalid Notion URL: ${pageId}`);
    }
  }

  // Prepare request body
  const requestBody: any = {
    rich_text: [
      {
        type: 'text',
        text: {
          content: commentText,
        },
      },
    ],
  };

  // Set the appropriate parent object based on whether we're commenting on a page or in a discussion
  if (parsedPageId) {
    requestBody.parent = {
      page_id: parsedPageId,
    };
    log(`Creating comment on page: ${parsedPageId}`);
  } else {
    requestBody.discussion_id = discussionId;
    log(`Creating comment in discussion thread: ${discussionId}`);
  }

  try {
    // Make API call to create the comment
    const response = await notion.comments.create(requestBody);

    log('Comment created successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    if (error.status === 404) {
      throw new Error(
        'The page or discussion thread was not found. Please check the ID and try again.',
      );
    } else if (error.status === 403) {
      throw new Error(
        'Permission denied. Make sure your integration has comment capabilities enabled.',
      );
    } else {
      throw new Error(
        `Failed to create comment: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
