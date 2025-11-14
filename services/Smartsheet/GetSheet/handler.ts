import smartsheet from 'smartsheet';

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
    sheetId,
    includeAttachments,
    includeDiscussions,
    includeRowPermalink,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!sheetId) {
    throw new Error('Sheet ID is required');
  }

  // Get access token from environment
  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is missing');
  }

  // Initialize Smartsheet client
  const client = smartsheet.createClient({ accessToken });

  log(`Retrieving sheet with ID: ${sheetId}`);

  try {
    // Build include parameter
    const includeParams: string[] = [];

    if (includeAttachments) {
      includeParams.push('attachments');
    }
    if (includeDiscussions) {
      includeParams.push('discussions');
    }
    if (includeRowPermalink) {
      includeParams.push('rowPermalink');
    }

    // Prepare options
    const options: any = {
      id: sheetId,
    };

    if (includeParams.length > 0) {
      options.queryParameters = {
        include: includeParams.join(','),
      };
    }

    // Get sheet
    const response = await client.sheets.getSheet(options);

    log(`Successfully retrieved sheet: ${response.name}`);
    log(
      `Sheet contains ${response.rows?.length || 0} rows and ${response.columns?.length || 0} columns`,
    );

    // Set output variable
    setOutput(outputVariable, response);
  } catch (error: any) {
    const errorMessage = error.message || 'Unknown error occurred';

    if (error.statusCode === 404) {
      throw new Error(
        `Sheet not found: ${sheetId}. Please check the ID and your access permissions.`,
      );
    } else if (error.statusCode === 403) {
      throw new Error(
        `Access denied to sheet: ${sheetId}. You may not have permission to view this sheet.`,
      );
    } else {
      throw new Error(`Failed to get sheet: ${errorMessage}`);
    }
  }
};
