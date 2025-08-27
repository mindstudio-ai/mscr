export const handler = async ({
  inputs,
  setOutput,
  log,
  uploadFile,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
  uploadFile: (data: Buffer, mimeType: string) => Promise<string>;
}) => {
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please check your connection configuration.',
    );
  }

  // Extract input parameters
  const {
    dealName,
    amount,
    accountId,
    ownerId,
    opportunityStageId,
    closedDate,
    outputVariable,
  } = inputs;

  // Validate required fields
  if (!dealName) {
    throw new Error('Deal Name is required');
  }

  // Prepare request payload
  const payload: Record<string, any> = {
    name: dealName,
  };

  // Add optional fields if provided
  if (amount) {
    payload.amount = amount;
  }
  if (accountId) {
    payload.account_id = accountId;
  }
  if (ownerId) {
    payload.owner_id = ownerId;
  }
  if (opportunityStageId) {
    payload.opportunity_stage_id = opportunityStageId;
  }
  if (closedDate) {
    payload.closed_date = closedDate;
  }

  log(`Creating deal "${dealName}" in Apollo...`);

  try {
    // Make API request to create deal
    const response = await fetch('https://api.apollo.io/api/v1/opportunities', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: apiKey,
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(payload),
    });

    // Handle HTTP error responses
    if (!response.ok) {
      const errorText = await response.text();

      // Handle specific error codes
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error('Forbidden. This endpoint requires a master API key.');
      } else if (response.status === 422) {
        throw new Error(`Invalid request data: ${errorText}`);
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }
    }

    // Parse successful response
    const data = await response.json();

    if (!data.opportunity) {
      throw new Error('Unexpected response format from Apollo API');
    }

    log(
      `Successfully created deal "${dealName}" with ID: ${data.opportunity.id}`,
    );

    // Set output variable with the deal information
    setOutput(outputVariable, data.opportunity);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error(`An unexpected error occurred: ${String(error)}`);
    }
  }
};
