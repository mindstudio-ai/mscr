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

  const { pageIdOrUrl, filterProperties, outputVariable } = inputs;

  if (!pageIdOrUrl) {
    throw new Error('Page ID or URL is required');
  }

  // Extract page ID from URL or use directly provided ID
  const pageId = extractPageId(pageIdOrUrl);

  log(`Retrieving Notion page with ID: ${pageId}`);

  // Initialize Notion client
  const notion = new Client({ auth: token });

  // Prepare request parameters
  const requestParams: any = { page_id: pageId };

  // Add filter_properties if provided
  if (filterProperties) {
    const propertyIds = filterProperties.split(',').map((id) => id.trim());
    if (propertyIds.length > 0) {
      requestParams.filter_properties = propertyIds;
      log(`Filtering response to include only specified properties`);
    }
  }

  try {
    // Retrieve the page
    const response = await notion.pages.retrieve(requestParams);

    log(`Successfully retrieved page "${response.id}"`);

    // Set the output variable with the page data
    setOutput(outputVariable, response);
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(
        `Page not found. Please check if the page ID is correct and that your integration has access to it.`,
      );
    } else if (error.status === 403) {
      throw new Error(
        `Access denied. Your integration doesn't have permission to access this page.`,
      );
    } else {
      throw new Error(`Failed to retrieve page: ${error.message || error}`);
    }
  }
};

/**
 * Extracts a Notion page ID from either a raw ID or a Notion URL
 *
 * @param pageIdOrUrl - The page ID or URL to extract from
 * @returns The extracted page ID
 */
function extractPageId(pageIdOrUrl: string): string {
  // Check if it's a URL
  if (pageIdOrUrl.includes('notion.so')) {
    // Extract the ID from the URL
    // Notion URLs typically end with a 32-character ID with hyphens
    const idMatch = pageIdOrUrl.match(
      /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
    );

    if (idMatch && idMatch[1]) {
      return idMatch[1];
    }

    throw new Error('Could not extract a valid page ID from the provided URL');
  }

  // If it's not a URL, assume it's already a page ID
  return pageIdOrUrl;
}
