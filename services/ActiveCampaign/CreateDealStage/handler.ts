export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  // Extract environment variables
  const { accessToken, accountIdentifier } = process.env;

  // Validate environment variables
  if (!accessToken) {
    throw new Error(
      'Missing API Key. Please add your ActiveCampaign API Key in the connector settings.',
    );
  }

  if (!accountIdentifier) {
    throw new Error(
      'Missing Account URL. Please add your ActiveCampaign Account URL in the connector settings.',
    );
  }

  // Extract inputs
  const {
    title,
    group,
    order,
    color,
    width,
    dealOrder,
    cardRegion1,
    cardRegion2,
    cardRegion3,
    cardRegion4,
    cardRegion5,
    reorder,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!title) {
    throw new Error('Title is required');
  }

  if (!group) {
    throw new Error('Pipeline ID is required');
  }

  // Prepare request URL with optional query parameters
  let url = `${accountIdentifier}/api/3/dealStages`;
  if (reorder) {
    url += `?reorder=${reorder}`;
  }

  // Prepare request body
  const requestBody = {
    dealStage: {
      title,
      group,
      dealOrder: dealOrder || 'next-action DESC',
      cardRegion1: cardRegion1 || 'title',
      cardRegion2: cardRegion2 || 'next-action',
      cardRegion3: cardRegion3 || 'show-avatar',
      cardRegion4: cardRegion4 || 'contact-fullname-orgname',
      cardRegion5: cardRegion5 || 'value',
      color: color || '32B0FC',
      width: width ? parseInt(width) : 280,
    },
  };

  // Add optional order parameter if provided
  if (order) {
    requestBody.dealStage.order = parseInt(order);
  }

  log(`Creating deal stage "${title}" in pipeline ${group}...`);

  try {
    // Make API request
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Parse response
    const responseData = await response.json();

    // Handle errors
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      throw new Error(`API Error (${response.status}): ${errorMessage}`);
    }

    log(`Successfully created deal stage "${title}"`);

    // Set output
    setOutput(outputVariable, responseData);
  } catch (error) {
    log(`Error creating deal stage: ${error.message}`);
    throw error;
  }
};
