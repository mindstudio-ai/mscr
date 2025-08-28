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

  // Build request body
  const requestBody: Record<string, any> = {};

  // Add title if provided
  if (title) {
    requestBody.title = [
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
    requestBody.description = [
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
        requestBody.properties = properties;
        log(`Updating database properties schema`);
      }
    } catch (error) {
      throw new Error(`Invalid JSON for database properties: ${error.message}`);
    }
  }

  // If no updates were specified, inform the user
  if (Object.keys(requestBody).length === 0) {
    log('No updates specified. Database will remain unchanged.');
    throw new Error(
      'Please specify at least one property to update (title, description, or properties).',
    );
  }

  try {
    // Make the API request
    const response = await fetch(
      `https://api.notion.com/v1/databases/${databaseId}`,
      {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      },
    );

    // Handle response
    if (!response.ok) {
      const errorData = await response.json();
      const status = response.status;

      if (status === 404) {
        throw new Error(
          `Database not found. Please check the database ID and ensure your integration has access to it.`,
        );
      } else if (status === 429) {
        throw new Error(`Rate limit exceeded. Please try again later.`);
      } else {
        throw new Error(
          `Notion API error (${status}): ${errorData.message || JSON.stringify(errorData)}`,
        );
      }
    }

    // Parse and return the updated database
    const updatedDatabase = await response.json();
    log(`Successfully updated Notion database`);

    setOutput(outputVariable, updatedDatabase);
  } catch (error) {
    log(`Error updating database: ${error.message}`);
    throw error;
  }
};

/**
 * Extracts a database ID from either a raw ID or a Notion URL
 * @param input Raw database ID or Notion URL
 * @returns Extracted database ID or null if invalid
 */
function extractDatabaseId(input: string): string | null {
  if (!input) {
    return null;
  }

  // If input is already a valid ID (32 chars with dashes)
  if (
    /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(input)
  ) {
    return input;
  }

  // If input is a URL, extract the ID
  // Notion URLs can be in formats like:
  // https://www.notion.so/workspace/668d797c76fa49349b05ad288df2d136
  // https://www.notion.so/668d797c76fa49349b05ad288df2d136
  const urlMatch = input.match(
    /([a-f0-9]{32})|([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/i,
  );

  if (urlMatch) {
    const extractedId = urlMatch[0];

    // If ID is without dashes, insert them
    if (extractedId.length === 32 && !extractedId.includes('-')) {
      return `${extractedId.slice(0, 8)}-${extractedId.slice(8, 12)}-${extractedId.slice(12, 16)}-${extractedId.slice(16, 20)}-${extractedId.slice(20)}`;
    }

    return extractedId;
  }

  return null;
}
