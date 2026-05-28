const NOTION_API_VERSION = '2025-09-03';
const NOTION_API_BASE_URL = 'https://api.notion.com/v1';

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
  const pageId = parseNotionId(parentPageId);
  if (!pageId) {
    throw new Error('Invalid parent page ID or URL');
  }
  log(`Creating database in parent page: ${pageId}`);

  const properties = parseJsonInput(
    propertiesDefinition,
    'database properties definition',
  );

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
    initial_data_source: {
      properties,
    },
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
      `Creating database "${databaseTitle}" with ${Object.keys(properties).length} properties...`,
    );
    const response = await notionApiRequest({
      path: 'databases',
      method: 'POST',
      token,
      body: payload,
    });

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

async function notionApiRequest({
  path,
  method,
  token,
  body,
}: {
  path: string;
  method: 'POST';
  token: string;
  body: Record<string, any>;
}): Promise<any> {
  const response = await fetch(`${NOTION_API_BASE_URL}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION,
    },
    body: JSON.stringify(body),
  });
  const responseText = await response.text();
  const responseBody = responseText ? JSON.parse(responseText) : {};

  if (!response.ok) {
    const error: any = new Error(responseBody.message || response.statusText);
    error.status = response.status;
    throw error;
  }

  return responseBody;
}

function parseJsonInput(value: any, label: string): Record<string, any> {
  try {
    const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;

    if (
      !parsedValue ||
      typeof parsedValue !== 'object' ||
      Array.isArray(parsedValue)
    ) {
      throw new Error(`${label} must be a JSON object`);
    }

    return parsedValue;
  } catch (error: any) {
    throw new Error(`Invalid JSON for ${label}: ${error.message}`);
  }
}

function parseNotionId(input: string): string | null {
  if (!input) {
    return null;
  }

  const idMatch = input.match(
    /([a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12})|([a-zA-Z0-9]{32})/,
  );
  if (!idMatch) {
    return null;
  }

  return idMatch[0]
    .replace(/-/g, '')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}
