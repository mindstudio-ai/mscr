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
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract inputs
  const {
    parentType,
    parentId,
    dataSourceId: rawDataSourceId,
    pageTitle,
    pageProperties,
    pageContent,
    iconType,
    iconValue,
    coverImageUrl,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!parentId) {
    throw new Error('Parent ID is required');
  }

  if (!pageTitle) {
    throw new Error('Page title is required');
  }

  // Initialize Notion client
  const token = process.env.token;
  if (!token) {
    throw new Error('Notion API token is missing');
  }

  log(`Creating new Notion page under ${parentType}: ${parentId}`);

  const parent = await buildParent({
    parentType,
    parentId,
    rawDataSourceId,
    token,
    log,
  });

  // Prepare the request body
  const requestBody: any = {
    parent,
    properties: {},
  };

  // Set page title
  if (parent.type === 'page_id') {
    // For pages, only title is allowed as a property
    requestBody.properties = {
      title: [
        {
          text: {
            content: pageTitle,
          },
        },
      ],
    };
  } else {
    // For databases, set the title property
    requestBody.properties = {
      Name: {
        title: [
          {
            text: {
              content: pageTitle,
            },
          },
        ],
      },
    };

    // Add additional properties for database pages if provided
    if (pageProperties) {
      try {
        const additionalProps =
          typeof pageProperties === 'string'
            ? JSON.parse(pageProperties)
            : pageProperties;

        requestBody.properties = {
          ...requestBody.properties,
          ...additionalProps,
        };

        log('Added additional page properties');
      } catch (error) {
        log(
          'Warning: Could not parse page properties JSON. Continuing with only title property.',
        );
      }
    }
  }

  // Add icon if provided
  if (iconType && iconType !== 'none' && iconValue) {
    if (iconType === 'emoji') {
      requestBody.icon = {
        type: 'emoji',
        emoji: iconValue,
      };
      log(`Set page icon to emoji: ${iconValue}`);
    } else if (iconType === 'external') {
      requestBody.icon = {
        type: 'external',
        external: {
          url: iconValue,
        },
      };
      log(`Set page icon to external URL`);
    }
  }

  // Add cover image if provided
  if (coverImageUrl) {
    requestBody.cover = {
      type: 'external',
      external: {
        url: coverImageUrl,
      },
    };
    log('Set page cover image');
  }

  // Add content blocks if provided
  if (pageContent) {
    try {
      const contentBlocks =
        typeof pageContent === 'string' ? JSON.parse(pageContent) : pageContent;

      requestBody.children = contentBlocks;
      log('Added content blocks to the page');
    } catch (error) {
      log(
        'Warning: Could not parse page content JSON. Creating page without content.',
      );
    }
  }

  try {
    // Create the page
    const response = await notionApiRequest({
      path: 'pages',
      method: 'POST',
      token,
      body: requestBody,
    });
    log(`Successfully created Notion page with ID: ${response.id}`);

    // Set the output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle API errors
    const errorMessage = error.message || 'Unknown error occurred';
    const statusCode = error.status || '';

    if (statusCode === 404) {
      throw new Error(
        `Parent not found: ${parentId}. Please check the ID and ensure your integration has access to it.`,
      );
    } else if (statusCode === 403) {
      throw new Error(
        'Permission denied. Make sure your integration has "Insert Content" capabilities for this page/database.',
      );
    } else {
      throw new Error(`Failed to create Notion page: ${errorMessage}`);
    }
  }
};

async function buildParent({
  parentType,
  parentId,
  rawDataSourceId,
  token,
  log,
}: {
  parentType: string;
  parentId: string;
  rawDataSourceId?: string;
  token: string;
  log: (message: string) => void;
}): Promise<Record<string, string>> {
  if (parentType === 'page_id') {
    const pageId = parseNotionId(parentId);
    if (!pageId) {
      throw new Error('Invalid parent page ID or URL');
    }

    return {
      type: 'page_id',
      page_id: pageId,
    };
  }

  if (parentType === 'data_source_id') {
    const dataSourceId = parseNotionId(parentId);
    if (!dataSourceId) {
      throw new Error('Invalid data source ID or URL');
    }

    return {
      type: 'data_source_id',
      data_source_id: dataSourceId,
    };
  }

  if (parentType !== 'database_id') {
    throw new Error(
      'Parent type must be page_id, database_id, or data_source_id',
    );
  }

  const databaseId = parseNotionId(parentId);
  if (!databaseId) {
    throw new Error('Invalid parent database ID or URL');
  }

  const dataSourceId = await resolveDataSourceId({
    databaseId,
    rawDataSourceId,
    token,
    log,
  });

  return {
    type: 'data_source_id',
    data_source_id: dataSourceId,
  };
}

async function resolveDataSourceId({
  databaseId,
  rawDataSourceId,
  token,
  log,
}: {
  databaseId: string;
  rawDataSourceId?: string;
  token: string;
  log: (message: string) => void;
}): Promise<string> {
  const dataSourceSelector =
    typeof rawDataSourceId === 'string' ? rawDataSourceId.trim() : '';
  const directDataSourceId = parseNotionId(dataSourceSelector);

  if (directDataSourceId) {
    log(`Using Notion data source: ${directDataSourceId}`);
    return directDataSourceId;
  }

  const database = await notionApiRequest({
    path: `databases/${databaseId}`,
    method: 'GET',
    token,
  });
  const dataSources = Array.isArray(database.data_sources)
    ? database.data_sources
    : [];

  if (dataSources.length === 0) {
    throw new Error('No data sources found for this Notion database.');
  }

  if (dataSourceSelector) {
    const matchingDataSource = dataSources.find(
      (dataSource: any) =>
        typeof dataSource.name === 'string' &&
        dataSource.name.toLowerCase() === dataSourceSelector.toLowerCase(),
    );

    if (!matchingDataSource) {
      throw new Error(
        `Data source "${dataSourceSelector}" was not found. Available data sources: ${formatDataSources(dataSources)}.`,
      );
    }

    log(`Using Notion data source: ${matchingDataSource.name}`);
    return matchingDataSource.id;
  }

  if (dataSources.length > 1) {
    throw new Error(
      `This Notion database has multiple data sources. Provide one in the Data Source ID or Name field: ${formatDataSources(dataSources)}.`,
    );
  }

  log(`Using Notion data source: ${dataSources[0].name || dataSources[0].id}`);
  return dataSources[0].id;
}

async function notionApiRequest({
  path,
  method,
  token,
  body,
}: {
  path: string;
  method: 'GET' | 'POST';
  token: string;
  body?: Record<string, any>;
}): Promise<any> {
  const response = await fetch(`${NOTION_API_BASE_URL}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION,
    },
    body: body ? JSON.stringify(body) : undefined,
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

function formatDataSources(dataSources: any[]): string {
  return dataSources
    .map((dataSource) => {
      if (dataSource.name) {
        return `${dataSource.name} (${dataSource.id})`;
      }

      return dataSource.id;
    })
    .join(', ');
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
