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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing Apollo API Key. Please add your API key in the connector settings.',
    );
  }

  // Extract required inputs
  const {
    name,
    domain,
    outputVariable,
    // Optional inputs
    ownerId,
    accountStageId,
    phone,
    rawAddress,
  } = inputs;

  // Validate required inputs
  if (!name) {
    throw new Error('Account name is required');
  }

  if (!domain) {
    throw new Error('Domain is required');
  }

  // Prepare request payload
  const payload: Record<string, string> = {
    name,
    domain,
    api_key: apiKey,
  };

  // Add optional parameters if provided
  if (ownerId) {
    payload.owner_id = ownerId;
  }
  if (accountStageId) {
    payload.account_stage_id = accountStageId;
  }
  if (phone) {
    payload.phone = phone;
  }
  if (rawAddress) {
    payload.raw_address = rawAddress;
  }

  log(`Creating Apollo account for "${name}" with domain "${domain}"...`);

  try {
    // Make API request to create account
    const response = await fetch('https://api.apollo.io/api/v1/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(payload),
    });

    // Parse response
    const responseData = await response.json();

    // Check for errors
    if (!response.ok) {
      const errorMessage =
        responseData.error || responseData.message || 'Unknown error occurred';

      // Provide more specific error for common issues
      if (response.status === 403) {
        throw new Error(
          'Authorization failed. This endpoint requires a master API key. Please check your API key permissions.',
        );
      }

      throw new Error(`Apollo API error (${response.status}): ${errorMessage}`);
    }

    // Check if account was created successfully
    if (!responseData.account) {
      throw new Error(
        'Account creation failed: No account data returned from Apollo',
      );
    }

    log(
      `Successfully created account "${name}" with ID: ${responseData.account.id}`,
    );

    // Set the output variable with the full account details
    setOutput(outputVariable, responseData.account);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error creating Apollo account: ${error.message}`);
      throw error;
    }
    throw new Error(`Unknown error occurred: ${String(error)}`);
  }
};
