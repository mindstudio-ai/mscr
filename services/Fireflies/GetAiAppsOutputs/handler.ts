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
      'Missing API Key. Please check your Fireflies.ai connection settings.',
    );
  }

  const { transcriptId, appId, skip, limit, outputVariable } = inputs;

  // Convert skip and limit to numbers for the GraphQL variables
  const skipValue = skip ? parseFloat(skip) : 0;
  const limitValue = limit ? parseFloat(limit) : 10;

  // Build query variables
  const variables: Record<string, any> = {
    skip: skipValue,
    limit: limitValue,
  };

  // Only add optional filters if they're provided
  if (transcriptId) {
    variables.transcriptId = transcriptId;
  }

  if (appId) {
    variables.appId = appId;
  }

  // Construct the GraphQL query
  const query = `
    query GetAIAppsOutputs($appId: String, $transcriptId: String, $skip: Float, $limit: Float) {
      apps(app_id: $appId, transcript_id: $transcriptId, skip: $skip, limit: $limit) {
        outputs {
          transcript_id
          user_id
          app_id
          created_at
          title
          prompt
          response
        }
      }
    }
  `;

  log('Fetching AI App outputs from Fireflies.ai...');

  try {
    // Make the GraphQL request
    const response = await fetch('https://api.fireflies.ai/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed: ${response.status} ${response.statusText} - ${errorText}`,
      );
    }

    const data = await response.json();

    // Check for GraphQL errors
    if (data.errors) {
      const errorMessage = data.errors.map((e: any) => e.message).join(', ');
      throw new Error(`GraphQL error: ${errorMessage}`);
    }

    // Extract the app outputs
    const appOutputs = data.data?.apps?.outputs || [];

    log(`Successfully retrieved ${appOutputs.length} AI App output(s)`);

    // Set the output variable with the results
    setOutput(outputVariable, appOutputs);
  } catch (error) {
    log(
      `Error fetching AI App outputs: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
