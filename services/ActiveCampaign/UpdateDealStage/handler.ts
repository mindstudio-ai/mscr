export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { accessToken, accountIdentifier } = process.env;

  // Validate required environment variables
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
    stageId,
    title,
    group,
    color,
    order,
    width,
    cardRegion1,
    cardRegion2,
    cardRegion3,
    cardRegion4,
    cardRegion5,
    dealOrder,
    reorder,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!stageId) {
    throw new Error('Deal Stage ID is required');
  }

  if (!title) {
    throw new Error('Title is required');
  }

  if (!group) {
    throw new Error('Pipeline ID is required');
  }

  // Construct the API URL
  const baseUrl = accountIdentifier.endsWith('/')
    ? accountIdentifier.slice(0, -1)
    : accountIdentifier;

  const url = `${baseUrl}/api/3/dealStages/${stageId}${reorder ? `?reorder=${reorder}` : ''}`;

  // Prepare request body
  const dealStage: Record<string, any> = {
    title,
    group,
  };

  // Add optional fields if provided
  if (color) {
    dealStage.color = color;
  }
  if (order) {
    dealStage.order = parseInt(order, 10);
  }
  if (width) {
    dealStage.width = parseInt(width, 10);
  }
  if (cardRegion1) {
    dealStage.cardRegion1 = cardRegion1;
  }
  if (cardRegion2) {
    dealStage.cardRegion2 = cardRegion2;
  }
  if (cardRegion3) {
    dealStage.cardRegion3 = cardRegion3;
  }
  if (cardRegion4) {
    dealStage.cardRegion4 = cardRegion4;
  }
  if (cardRegion5) {
    dealStage.cardRegion5 = cardRegion5;
  }
  if (dealOrder) {
    dealStage.dealOrder = dealOrder;
  }

  const requestBody = {
    dealStage,
  };

  log(`Updating deal stage with ID: ${stageId}`);

  try {
    // Make the API request
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Api-Token': accessToken,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to update deal stage: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const responseData = await response.json();
    log(`Deal stage "${responseData.dealStage.title}" updated successfully`);

    // Set output
    setOutput(outputVariable, responseData.dealStage);
  } catch (error) {
    log(
      `Error updating deal stage: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
