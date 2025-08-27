export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    automationId,
    page = '1',
    limit = '10',
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!automationId) {
    throw new Error('Automation ID is required');
  }

  // Construct the API URL with query parameters
  const baseUrl = `https://api.beehiiv.com/v2/publications/${publicationId}/automations/${automationId}/journeys`;
  const url = new URL(baseUrl);
  url.searchParams.append('page', page);
  url.searchParams.append('limit', limit);

  log(
    `Fetching automation journeys for automation ${automationId} in publication ${publicationId}`,
  );

  try {
    // Make the API request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();

      // Handle specific error status codes
      if (response.status === 400) {
        throw new Error(`Bad request: ${errorText}`);
      } else if (response.status === 404) {
        throw new Error(`Publication or automation not found: ${errorText}`);
      } else if (response.status === 429) {
        throw new Error(
          `Rate limit exceeded. Please try again later: ${errorText}`,
        );
      } else if (response.status === 500) {
        throw new Error(`Beehiiv server error: ${errorText}`);
      } else {
        throw new Error(
          `Error fetching automation journeys: ${response.status} ${errorText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Log success message with result count
    log(
      `Successfully retrieved ${data.data.length} automation journeys (page ${data.page} of ${data.total_pages})`,
    );

    // Set the output variable with the full response
    setOutput(outputVariable, data);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw new Error(`Failed to fetch automation journeys: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while fetching automation journeys',
      );
    }
  }
};
