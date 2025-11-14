import smartsheet from 'smartsheet';

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
  const {
    name,
    callbackUrl,
    scope,
    scopeObjectId,
    events,
    version,
    outputVariable,
  } = inputs;

  if (!name) {
    throw new Error('Webhook name is required');
  }

  if (!callbackUrl) {
    throw new Error('Callback URL is required');
  }

  if (!scope) {
    throw new Error('Scope is required');
  }

  if (!scopeObjectId) {
    throw new Error('Scope object ID is required');
  }

  if (!events || !Array.isArray(events) || events.length === 0) {
    throw new Error('Events array is required');
  }

  const accessToken = process.env.accessToken;
  if (!accessToken) {
    throw new Error('Smartsheet access token is not configured');
  }

  const client = smartsheet.createClient({ accessToken });

  try {
    log(`Creating webhook ${name}...`);

    const webhookSpec: any = {
      name,
      callbackUrl,
      scope,
      scopeObjectId: parseInt(scopeObjectId, 10),
      events,
      version: version || 1,
    };

    const result = await client.webhooks.createWebhook({ body: webhookSpec });

    log(`Successfully created webhook: ${name}`);
    setOutput(outputVariable, result);
  } catch (error: any) {
    log(`Error creating webhook: ${error.message}`);
    throw error;
  }
};
