import { BeehiivClient } from 'beehiiv';

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
  // Get API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please add your Beehiiv API key in the connector settings.',
    );
  }

  // Extract inputs
  const {
    publicationId,
    name,
    description,
    addPricing,
    currency,
    amountCents,
    interval,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!name) {
    throw new Error('Tier name is required');
  }

  // Initialize the Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare the request payload
  const payload: {
    name: string;
    description?: string;
    prices_attributes?: Array<{
      currency: string;
      amount_cents: number;
      interval: string;
      enabled: boolean;
    }>;
  } = {
    name,
  };

  // Add description if provided
  if (description) {
    payload.description = description;
  }

  // Add pricing information if enabled
  if (addPricing === 'yes') {
    if (!currency) {
      throw new Error('Currency is required when adding pricing');
    }

    if (!amountCents) {
      throw new Error('Amount is required when adding pricing');
    }

    if (!interval) {
      throw new Error('Billing interval is required when adding pricing');
    }

    payload.prices_attributes = [
      {
        currency,
        amount_cents: Number(amountCents),
        interval,
        enabled: true,
      },
    ];
  }

  try {
    log(`Creating new tier "${name}" for publication ${publicationId}...`);

    // Make the API call to create the tier
    const response = await client.tiers.postPublicationsPublicationIdTiers(
      publicationId,
      payload,
    );

    log(`Successfully created tier: ${response.data.name}`);

    // Set the output variable with the created tier data
    setOutput(outputVariable, response.data);
  } catch (error) {
    // Handle errors
    if (error instanceof Error) {
      log(`Error creating tier: ${error.message}`);
      throw new Error(`Failed to create tier: ${error.message}`);
    } else {
      log('An unknown error occurred while creating the tier');
      throw new Error('Failed to create tier due to an unknown error');
    }
  }
};
