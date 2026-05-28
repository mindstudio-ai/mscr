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
  const {
    databaseId: rawDatabaseId,
    dataSourceId: rawDataSourceId,
    outputVariable,
  } = inputs;
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

  try {
    // Retrieve the database
    const database = await notionApiRequest({
      path: `databases/${databaseId}`,
      method: 'GET',
      token,
    });
    const dataSourceDetails = await retrieveDataSourceDetails({
      database,
      rawDataSourceId,
      token,
    });
    const response = {
      ...database,
      data_source_details: dataSourceDetails,
    };

    if (dataSourceDetails.length === 1 && dataSourceDetails[0].properties) {
      response.properties = dataSourceDetails[0].properties;
    }

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

async function retrieveDataSourceDetails({
  database,
  rawDataSourceId,
  token,
}: {
  database: any;
  rawDataSourceId?: string;
  token: string;
}): Promise<any[]> {
  const dataSources = Array.isArray(database.data_sources)
    ? database.data_sources
    : [];

  if (dataSources.length === 0) {
    return [];
  }

  const selectedDataSources = selectDataSources(dataSources, rawDataSourceId);

  return Promise.all(
    selectedDataSources.map((dataSource) =>
      notionApiRequest({
        path: `data_sources/${dataSource.id}`,
        method: 'GET',
        token,
      }),
    ),
  );
}

function selectDataSources(
  dataSources: any[],
  rawDataSourceId?: string,
): any[] {
  const dataSourceSelector =
    typeof rawDataSourceId === 'string' ? rawDataSourceId.trim() : '';

  if (!dataSourceSelector) {
    return dataSources;
  }

  const directDataSourceId = parseNotionId(dataSourceSelector);
  const matchingDataSource = dataSources.find((dataSource) => {
    if (directDataSourceId && dataSource.id === directDataSourceId) {
      return true;
    }

    return (
      typeof dataSource.name === 'string' &&
      dataSource.name.toLowerCase() === dataSourceSelector.toLowerCase()
    );
  });

  if (!matchingDataSource) {
    throw new Error(
      `Data source "${dataSourceSelector}" was not found. Available data sources: ${formatDataSources(dataSources)}.`,
    );
  }

  return [matchingDataSource];
}

async function notionApiRequest({
  path,
  method,
  token,
}: {
  path: string;
  method: 'GET';
  token: string;
}): Promise<any> {
  const response = await fetch(`${NOTION_API_BASE_URL}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Notion-Version': NOTION_API_VERSION,
    },
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

/**
 * Extracts the database ID from a Notion URL or returns the ID if already in correct format
 *
 * @param input A Notion database ID or URL
 * @returns The extracted database ID
 */
function extractDatabaseId(input: string): string {
  const databaseId = parseNotionId(input);
  if (!databaseId) {
    throw new Error(
      'Invalid database ID format. Please provide a valid Notion database ID or URL.',
    );
  }

  return databaseId;
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
