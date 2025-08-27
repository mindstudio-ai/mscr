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
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  const {
    opportunityId,
    name,
    amount,
    opportunityStageId,
    closedDate,
    isClosed,
    isWon,
    ownerId,
    accountId,
    source,
    outputVariable,
  } = inputs;

  if (!opportunityId) {
    throw new Error('Deal ID is required');
  }

  // Build request body with only the provided fields
  const requestBody: Record<string, any> = {};

  if (name !== undefined) {
    requestBody.name = name;
  }
  if (amount !== undefined) {
    requestBody.amount = amount;
  }
  if (opportunityStageId !== undefined) {
    requestBody.opportunity_stage_id = opportunityStageId;
  }
  if (closedDate !== undefined) {
    requestBody.closed_date = closedDate;
  }
  if (isClosed !== undefined) {
    requestBody.is_closed = isClosed === 'true';
  }
  if (isWon !== undefined) {
    requestBody.is_won = isWon === 'true';
  }
  if (ownerId !== undefined) {
    requestBody.owner_id = ownerId;
  }
  if (accountId !== undefined) {
    requestBody.account_id = accountId;
  }
  if (source !== undefined) {
    requestBody.source = source;
  }

  log(`Updating deal with ID: ${opportunityId}`);

  try {
    const response = await fetch(
      `https://api.apollo.io/api/v1/opportunities/${opportunityId}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(requestBody),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();

      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your API key.');
      } else if (response.status === 403) {
        throw new Error(
          'Access forbidden. This endpoint requires a master API key.',
        );
      } else if (response.status === 422) {
        throw new Error(`Invalid input data: ${errorText}`);
      } else if (response.status === 429) {
        throw new Error('API rate limit exceeded. Please try again later.');
      } else {
        throw new Error(`Apollo API error (${response.status}): ${errorText}`);
      }
    }

    const data = await response.json();
    log('Deal updated successfully');

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error updating deal: ${error.message}`);
      throw error;
    }
    throw new Error('An unknown error occurred while updating the deal');
  }
};
