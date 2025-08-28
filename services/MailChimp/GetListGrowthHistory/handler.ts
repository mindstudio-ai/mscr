import mailchimp from '@mailchimp/mailchimp_marketing';

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
  // Extract inputs and environment variables
  const { listId, month, outputVariable } = inputs;
  const { apiKey, serverPrefix } = process.env;

  // Validate required environment variables
  if (!apiKey || !serverPrefix) {
    throw new Error(
      'Missing MailChimp API key or server prefix. Please check your configuration.',
    );
  }

  // Validate required inputs
  if (!listId) {
    throw new Error('List ID is required');
  }

  if (!month) {
    throw new Error('Month is required (format: YYYY-MM)');
  }

  // Validate month format (YYYY-MM)
  const monthRegex = /^\d{4}-\d{2}$/;
  if (!monthRegex.test(month)) {
    throw new Error('Month must be in the format YYYY-MM (e.g., 2023-01)');
  }

  // Configure the MailChimp client
  mailchimp.setConfig({
    apiKey,
    server: serverPrefix,
  });

  log(`Retrieving growth history for list "${listId}" for month "${month}"`);

  try {
    // Make the API request to get list growth history
    const response = await mailchimp.lists.getListGrowthHistoryByMonth(
      listId,
      month,
    );

    log(`Successfully retrieved growth history data for ${month}`);

    // Set the output variable with the response data
    setOutput(outputVariable, response);
  } catch (error: any) {
    // Handle common errors
    if (error.status === 404) {
      throw new Error(`List not found: ${listId}. Please check your List ID.`);
    } else if (error.status === 401) {
      throw new Error(
        'Authentication failed. Please check your API key and server prefix.',
      );
    } else if (error.status === 429) {
      throw new Error('API rate limit exceeded. Please try again later.');
    } else {
      // Log the detailed error for debugging
      log(`Error details: ${error.message || JSON.stringify(error)}`);
      throw new Error(
        `Failed to retrieve growth history: ${error.message || 'Unknown error'}`,
      );
    }
  }
};
