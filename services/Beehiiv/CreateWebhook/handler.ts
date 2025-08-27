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
  // Extract inputs
  const { publicationId, webhookUrl, eventTypes, description, outputVariable } =
    inputs;

  // Validate required environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your beehiiv API key in the connector settings.',
    );
  }

  // Validate required inputs
  if (!publicationId) {
    throw new Error('Publication ID is required');
  }

  if (!webhookUrl) {
    throw new Error('Webhook URL is required');
  }

  if (!eventTypes || !Array.isArray(eventTypes) || eventTypes.length === 0) {
    throw new Error('At least one event type must be selected');
  }

  log(`Creating webhook for publication ${publicationId}`);

  try {
    // Initialize the beehiiv client
    const client = new BeehiivClient({ token: apiKey });

    // Prepare webhook request payload
    const webhookData = {
      url: webhookUrl,
      eventTypes: eventTypes,
      ...(description ? { description } : {}),
    };

    log(
      `Sending request to create webhook with ${eventTypes.length} event types`,
    );

    // Create the webhook
    const response = await client.webhooks.postWebhooks(
      publicationId,
      webhookData,
    );

    log(`Webhook created successfully with ID: ${response.data.id}`);

    // Set the output variable with the webhook details
    setOutput(outputVariable, {
      id: response.data.id,
      url: response.data.url,
      created: response.data.created,
      updated: response.data.updated,
      eventTypes: response.data.event_types,
      description: response.data.description,
    });
  } catch (error: any) {
    // Handle errors
    if (error.response?.status === 404) {
      throw new Error(`Publication with ID ${publicationId} not found`);
    } else if (error.response?.status === 400) {
      throw new Error(`Invalid request: ${error.message}`);
    } else if (error.response?.status === 429) {
      throw new Error('Rate limit exceeded. Please try again later.');
    } else {
      throw new Error(`Failed to create webhook: ${error.message}`);
    }
  }
};
