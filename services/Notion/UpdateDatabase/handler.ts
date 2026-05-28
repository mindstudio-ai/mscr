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
  // Get the bearer token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing Notion API token. Please check your connection settings.',
    );
  }

  // Extract inputs
  const {
    databaseId: rawDatabaseId,
    dataSourceId: rawDataSourceId,
    title,
    description,
    propertiesJson,
    outputVariable,
  } = inputs;

  // Parse database ID from URL if needed
  const databaseId = extractDatabaseId(rawDatabaseId);
  if (!databaseId) {
    throw new Error(
      'Invalid database ID or URL. Please provide a valid Notion database ID or URL.',
    );
  }

  log(`Updating Notion database: ${databaseId}`);

  // Build request bodies
  const databaseRequestBody: Record<string, any> = {};
  const dataSourceRequestBody: Record<string, any> = {};

  // Add title if provided
  if (title) {
    databaseRequestBody.title = [
      {
        type: 'text',
        text: {
          content: title,
          link: null,
        },
      },
    ];
    log(`Setting new database title: "${title}"`);
  }

  // Add description if provided
  if (description) {
    databaseRequestBody.description = [
      {
        type: 'text',
        text: {
          content: description,
          link: null,
        },
      },
    ];
    log(`Setting new database description`);
  }

  // Add properties if provided
  if (propertiesJson) {
    try {
      // If propertiesJson is already an object (auto-parsed), use it directly
      // Otherwise, parse it as JSON
      const properties =
        typeof propertiesJson === 'string'
          ? JSON.parse(propertiesJson)
          : propertiesJson;

      if (properties) {
        dataSourceRequestBody.properties = properties;
        log(`Updating data source properties schema`);
      }
    } catch (error) {
      throw new Error(`Invalid JSON for database properties: ${error.message}`);
    }
  }

  // If no updates were specified, inform the user
  if (
    Object.keys(databaseRequestBody).length === 0 &&
    Object.keys(dataSourceRequestBody).length === 0
  ) {
    log('No updates specified. Database will remain unchanged.');
    throw new Error(
      'Please specify at least one property to update (title, description, or properties).',
    );
  }

  try {
    let updatedDatabase: any;
    let updatedDataSource: any;

    if (Object.keys(databaseRequestBody).length > 0) {
      updatedDatabase = await notionApiRequest({
        path: `databases/${databaseId}`,
        method: 'PATCH',
        token,
        body: databaseRequestBody,
      });
      log(`Successfully updated Notion database`);
    }

    if (Object.keys(dataSourceRequestBody).length > 0) {
      const dataSourceId = await resolveDataSourceId({
        databaseId,
        rawDataSourceId,
        token,
        log,
      });

      updatedDataSource = await notionApiRequest({
        path: `data_sources/${dataSourceId}`,
        method: 'PATCH',
        token,
        body: dataSourceRequestBody,
      });
      log(`Successfully updated Notion data source`);
    }

    if (!updatedDatabase) {
      updatedDatabase = await notionApiRequest({
        path: `databases/${databaseId}`,
        method: 'GET',
        token,
      });
    }

    if (updatedDataSource) {
      updatedDatabase = {
        ...updatedDatabase,
        data_source: updatedDataSource,
        properties: updatedDataSource.properties,
      };
    }

    setOutput(outputVariable, updatedDatabase);
  } catch (error) {
    log(`Error updating database: ${error.message}`);
    throw error;
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
}: {
  path: string;
  method: 'GET' | 'PATCH';
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

/**
 * Extracts a database ID from either a raw ID or a Notion URL
 * @param input Raw database ID or Notion URL
 * @returns Extracted database ID or null if invalid
 */
function extractDatabaseId(input: string): string | null {
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

  return idMatch[0]
    .replace(/-/g, '')
    .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
}
