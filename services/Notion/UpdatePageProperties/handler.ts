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
  // Extract inputs
  const {
    pageIdOrUrl,
    properties,
    icon,
    coverUrl,
    archiveStatus,
    outputVariable,
  } = inputs;

  // Validate token
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Notion API token. Please check your connection settings.',
    );
  }

  // Initialize Notion client
  const notion = new Client({
    auth: token,
    notionVersion: '2022-06-28',
  });

  // Parse page ID from URL or use directly
  const pageId = extractPageId(pageIdOrUrl);
  if (!pageId) {
    throw new Error(
      'Invalid Page ID or URL provided. Please check your input.',
    );
  }

  log(`Preparing to update Notion page: ${pageId}`);

  // Build update parameters
  const updateParams: any = {
    page_id: pageId,
    properties: properties,
  };

  // Handle icon if provided
  if (icon) {
    updateParams.icon = formatIcon(icon);
    log(
      `Setting page icon to: ${typeof icon === 'string' && icon.length === 2 ? icon : 'custom image'}`,
    );
  }

  // Handle cover if provided
  if (coverUrl) {
    updateParams.cover = {
      type: 'external',
      external: { url: coverUrl },
    };
    log('Setting page cover image');
  }

  // Handle archive status
  if (archiveStatus && archiveStatus !== 'noChange') {
    updateParams.archived = archiveStatus === 'archive';
    log(`${archiveStatus === 'archive' ? 'Archiving' : 'Restoring'} the page`);
  }

  try {
    // Make API call to update the page
    log('Updating page properties...');
    const response = await notion.pages.update(updateParams);

    log('Page updated successfully');
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle errors with clear messages
    if (error.status === 404) {
      throw new Error(
        'Page not found. Please check if the page ID is correct and you have access to it.',
      );
    } else if (error.status === 400) {
      throw new Error(
        `Invalid request: ${error.message || 'Please check your property values and formatting'}`,
      );
    } else if (error.status === 403) {
      throw new Error(
        'Permission denied. Your integration needs update content capabilities for this page.',
      );
    } else {
      throw new Error(`Failed to update page: ${error.message || error}`);
    }
  }
};

/**
 * Extracts a Notion page ID from either a direct ID or a Notion URL
 */
function extractPageId(pageIdOrUrl: string): string | null {
  // If it's already a UUID format, return it directly
  if (
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(
      pageIdOrUrl,
    )
  ) {
    return pageIdOrUrl;
  }

  // Handle notion.so URLs
  if (pageIdOrUrl.includes('notion.so')) {
    // Extract page ID from URL
    // Format can be: https://www.notion.so/{workspace}/{page-id}
    // or: https://www.notion.so/{page-id}
    const matches = pageIdOrUrl.match(/([a-f0-9]{32})/i);
    if (matches && matches[1]) {
      // Convert to UUID format (8-4-4-4-12)
      const id = matches[1];
      return `${id.slice(0, 8)}-${id.slice(8, 12)}-${id.slice(12, 16)}-${id.slice(16, 20)}-${id.slice(20)}`;
    }

    // Try extracting UUID format directly if present
    const uuidMatches = pageIdOrUrl.match(
      /([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
    );
    if (uuidMatches && uuidMatches[1]) {
      return uuidMatches[1];
    }
  }

  return null;
}

/**
 * Formats the icon input to match Notion's API requirements
 */
function formatIcon(icon: string): {
  type: string;
  emoji?: string;
  external?: { url: string };
} {
  // Check if it's an emoji (roughly)
  if (icon.length <= 2) {
    return {
      type: 'emoji',
      emoji: icon,
    };
  }

  // Otherwise treat as external URL
  return {
    type: 'external',
    external: {
      url: icon,
    },
  };
}
