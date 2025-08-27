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
      'Missing API Key. Please configure your Beehiiv API key in the connector settings.',
    );
  }

  // Extract required inputs
  const { publicationId, email, outputVariable } = inputs;

  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!email) {
    throw new Error('Email is required');
  }

  log(`Creating subscription for ${email} in publication ${publicationId}`);

  // Initialize Beehiiv client
  const client = new BeehiivClient({ token: apiKey });

  // Prepare request parameters
  const params: Record<string, any> = {
    email,
  };

  // Add optional parameters if provided
  if (inputs.reactivateExisting) {
    params.reactivateExisting = inputs.reactivateExisting === 'true';
  }

  if (inputs.sendWelcomeEmail) {
    params.sendWelcomeEmail = inputs.sendWelcomeEmail === 'true';
  }

  if (inputs.utmSource) {
    params.utmSource = inputs.utmSource;
  }

  if (inputs.utmMedium) {
    params.utmMedium = inputs.utmMedium;
  }

  if (inputs.utmCampaign) {
    params.utmCampaign = inputs.utmCampaign;
  }

  if (inputs.referringSite) {
    params.referringSite = inputs.referringSite;
  }

  if (inputs.referralCode) {
    params.referralCode = inputs.referralCode;
  }

  if (inputs.tier) {
    params.tier = inputs.tier;
  }

  // Handle custom fields if provided
  if (inputs.customFields) {
    try {
      // If customFields is already parsed as an array, use it directly
      // Otherwise, try to parse it as a JSON string
      const customFields = Array.isArray(inputs.customFields)
        ? inputs.customFields
        : JSON.parse(inputs.customFields);

      params.customFields = customFields;
    } catch (error) {
      log(
        'Warning: Could not parse custom fields. Make sure they are in valid JSON format.',
      );
    }
  }

  try {
    // Create the subscription
    const response = await client.subscriptions.create(publicationId, params);

    log(`Successfully created subscription for ${email}`);

    // Set the output variable
    setOutput(outputVariable, response);
  } catch (error) {
    // Handle API errors
    if (error instanceof Error) {
      log(`Error creating subscription: ${error.message}`);
      throw new Error(`Failed to create subscription: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while creating the subscription',
      );
    }
  }
};
