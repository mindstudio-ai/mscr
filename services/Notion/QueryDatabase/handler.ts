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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Notion API token');
  }

  // Extract inputs
  const {
    databaseId: rawDatabaseId,
    dataSourceId: rawDataSourceId,
    filter,
    sorts,
    pageSize,
    startCursor,
    filterProperties,
    outputVariable,
  } = inputs;

  // Parse database ID from URL or use as is
  const databaseId = parseNotionDatabaseId(rawDatabaseId);
  if (!databaseId) {
    throw new Error('Invalid database ID or URL');
  }

  log(`Querying Notion database: ${databaseId}`);

  try {
    const dataSourceId = await resolveDataSourceId({
      databaseId,
      rawDataSourceId,
      token,
      log,
    });

    const bodyParams: any = {};
    const queryParams: Record<string, string[]> = {};

    // Add optional parameters if provided
    if (filter) {
      bodyParams.filter = filter;
    }

    if (sorts) {
      bodyParams.sorts = sorts;
    }

    if (pageSize) {
      const parsedPageSize = parseInt(pageSize, 10);
      if (!isNaN(parsedPageSize)) {
        bodyParams.page_size = Math.min(parsedPageSize, 100); // Ensure it doesn't exceed the max of 100
      }
    }

    if (startCursor) {
      bodyParams.start_cursor = startCursor;
    }

    if (filterProperties) {
      // Convert comma-separated string to array
      queryParams.filter_properties = filterProperties
        .split(',')
        .map((prop) => prop.trim())
        .filter((prop) => prop.length > 0);
    }

    log('Sending request to Notion API...');

    const response = await notionApiRequest({
      path: `data_sources/${dataSourceId}/query`,
      method: 'POST',
      token,
      body: bodyParams,
      query: queryParams,
    });

    log(`Retrieved ${response.results.length} results from the database`);

    // Set the output variable with the query results
    setOutput(outputVariable, response);
  } catch (error: any) {
    if (error.status === 404) {
      throw new Error(
        'Database not found or not shared with the integration. Make sure to share the database with your integration in Notion.',
      );
    } else if (error.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Notion API error: ${error.message || 'Unknown error'}`);
    }
  }
};

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
  query,
}: {
  path: string;
  method: 'GET' | 'POST';
  token: string;
  body?: Record<string, any>;
  query?: Record<string, string[]>;
}): Promise<any> {
  const url = new URL(`${NOTION_API_BASE_URL}/${path}`);

  if (query) {
    for (const [key, values] of Object.entries(query)) {
      for (const value of values) {
        url.searchParams.append(key, value);
      }
    }
  }

  const response = await fetch(url.toString(), {
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
    error.code = responseBody.code;
    error.additionalData = responseBody.additional_data;
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

/**
 * Parses a Notion database ID from either a raw ID or a Notion URL
 *
 * @param input Raw database ID or Notion URL
 * @returns Parsed database ID or null if invalid
 */
function parseNotionDatabaseId(input: string): string | null {
  return parseNotionId(input);
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

  const cleanId = idMatch[0].replace(/-/g, '');
  if (/^[a-zA-Z0-9]{32}$/.test(cleanId)) {
    return cleanId.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
  }

  return null;
}
