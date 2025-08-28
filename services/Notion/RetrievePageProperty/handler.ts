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

  const { pageId, propertyId, pageSize, startCursor, outputVariable } = inputs;

  // Parse page ID from URL or use directly
  let parsedPageId = pageId;
  if (pageId.includes('notion.so')) {
    // Extract page ID from URL
    // Format can be either:
    // https://www.notion.so/workspace-name/page-title-pageId
    // or https://www.notion.so/page-title-pageId
    const matches = pageId.match(
      /([a-f0-9]{32}|[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})$/i,
    );
    if (matches && matches[1]) {
      parsedPageId = matches[1].replace(/-/g, '');
      // Add dashes to format the ID correctly if it's a UUID without dashes
      if (parsedPageId.length === 32) {
        parsedPageId = `${parsedPageId.slice(0, 8)}-${parsedPageId.slice(8, 12)}-${parsedPageId.slice(12, 16)}-${parsedPageId.slice(16, 20)}-${parsedPageId.slice(20)}`;
      }
      log(`Extracted page ID from URL: ${parsedPageId}`);
    } else {
      throw new Error('Could not extract page ID from the provided URL');
    }
  } else {
    // If it's a raw ID, ensure it has the correct format with dashes
    if (parsedPageId.length === 32 && !parsedPageId.includes('-')) {
      parsedPageId = `${parsedPageId.slice(0, 8)}-${parsedPageId.slice(8, 12)}-${parsedPageId.slice(12, 16)}-${parsedPageId.slice(16, 20)}-${parsedPageId.slice(20)}`;
    }
  }

  // Initialize Notion client
  const notion = new Client({ auth: token });

  log(`Retrieving property "${propertyId}" for page ${parsedPageId}`);

  try {
    // Prepare request parameters
    const requestParams: any = {
      page_id: parsedPageId,
      property_id: propertyId,
    };

    // Add optional pagination parameters if provided
    if (pageSize) {
      requestParams.page_size = parseInt(pageSize, 10);
    }
    if (startCursor) {
      requestParams.start_cursor = startCursor;
    }

    // Make the API request
    const response = await notion.pages.properties.retrieve(requestParams);

    log(`Successfully retrieved property data`);

    // Set the output variable with the response
    setOutput(outputVariable, response);
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(
        `Page or property not found. Please check your page ID and property ID.`,
      );
    } else if (error.status === 403) {
      throw new Error(
        `Access denied. Your integration doesn't have permission to access this page.`,
      );
    } else if (error.status === 400 || error.status === 429) {
      throw new Error(
        `Request limit exceeded or invalid request: ${error.message}`,
      );
    } else {
      throw new Error(`Failed to retrieve property: ${error.message}`);
    }
  }
};
