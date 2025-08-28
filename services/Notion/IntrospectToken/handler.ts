export const handler = async ({
  inputs,
  setOutput,
  log,
}: {
  inputs: Record<string, any>;
  setOutput: (variable: string, value: any) => void;
  log: (message: string) => void;
}) => {
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing Notion authentication token');
  }

  const { tokenToIntrospect, outputVariable } = inputs;

  // Determine which token to introspect
  const tokenToUse = tokenToIntrospect || token;

  log('Introspecting Notion token...');

  try {
    // Make the API request to introspect the token
    const response = await fetch('https://api.notion.com/v1/oauth/introspect', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        token: tokenToUse,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Notion API error (${response.status}): ${errorText}`);
    }

    const tokenInfo = await response.json();

    log('Token introspection completed successfully');

    // Set the output with the token information
    setOutput(outputVariable, tokenInfo);
  } catch (error) {
    log(
      `Error introspecting token: ${error instanceof Error ? error.message : String(error)}`,
    );
    throw error;
  }
};
