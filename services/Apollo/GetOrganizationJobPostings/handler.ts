export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please check your connection settings.',
    );
  }

  const { organizationId, perPage = '10', page = '1', outputVariable } = inputs;

  if (!organizationId) {
    throw new Error('Organization ID is required');
  }

  if (!outputVariable) {
    throw new Error('Output variable name is required');
  }

  log(`Fetching job postings for organization ID: ${organizationId}`);

  // Construct the URL with query parameters
  const url = `https://api.apollo.io/api/v1/organizations/${organizationId}/job_postings?page=${page}&per_page=${perPage}`;

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${apiKey}`,
      },
    });

    // Handle different response statuses
    if (!response.ok) {
      if (response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Apollo API key.',
        );
      } else if (response.status === 422) {
        throw new Error(
          'Invalid parameters provided. Please check your organization ID and other inputs.',
        );
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(
          `Apollo API error: ${response.status} ${response.statusText}`,
        );
      }
    }

    // Parse the response
    const data = await response.json();

    // Check if we have job postings in the response
    if (!data.organization_job_postings) {
      log('No job postings found for this organization');
      setOutput(outputVariable, []);
      return;
    }

    log(
      `Successfully retrieved ${data.organization_job_postings.length} job postings`,
    );

    // Set the output variable with the job postings data
    setOutput(outputVariable, data.organization_job_postings);
  } catch (error) {
    // Handle any errors that occurred during the request
    if (error instanceof Error) {
      log(`Error: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while fetching job postings');
  }
};
