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
    tierId,
    name,
    description,
    updatePrices,
    priceId,
    currency,
    amountCents,
    interval,
    intervalDisplay,
    cta,
    deletePriceOption,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }
  if (!tierId) {
    throw new Error('Tier ID is required');
  }

  // Initialize Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare request body
  const requestBody: Record<string, any> = {};

  // Add optional tier details if provided
  if (name) {
    requestBody.name = name;
  }
  if (description) {
    requestBody.description = description;
  }

  // Add price attributes if updating prices
  if (updatePrices === 'yes' && priceId) {
    requestBody.prices_attributes = [
      {
        id: priceId,
      },
    ];

    const priceAttributes = requestBody.prices_attributes[0];

    // Add optional price details if provided
    if (currency) {
      priceAttributes.currency = currency;
    }
    if (amountCents) {
      priceAttributes.amount_cents = parseInt(amountCents, 10);
    }
    if (interval) {
      priceAttributes.interval = interval;
    }
    if (intervalDisplay) {
      priceAttributes.interval_display = intervalDisplay;
    }
    if (cta) {
      priceAttributes.cta = cta;
    }
    if (deletePriceOption === 'yes') {
      priceAttributes.delete = true;
    }
  }

  try {
    log(`Updating tier ${tierId} for publication ${publicationId}...`);

    // Make the API request to update the tier
    const response =
      await client.tiers.patchPublicationsPublicationIdTiersTierId(
        publicationId,
        tierId,
        requestBody,
      );

    log('Tier updated successfully');

    // Set the output variable with the updated tier information
    setOutput(outputVariable, response.data);
  } catch (error: any) {
    // Handle different error types
    if (error.response?.status === 400) {
      throw new Error(`Bad request: ${error.message}`);
    } else if (error.response?.status === 404) {
      throw new Error(`Tier or publication not found: ${error.message}`);
    } else if (error.response?.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    } else {
      throw new Error(`Failed to update tier: ${error.message}`);
    }
  }
};
