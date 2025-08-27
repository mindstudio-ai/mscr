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
  const { userIdVariable, emailVariable, scopesVariable } = inputs;

  // Get token from environment variables
  const token = process.env.token;
  if (!token) {
    throw new Error('Airtable authentication token is missing');
  }

  log('Retrieving user information from Airtable...');

  try {
    // Make request to Airtable API
    const response = await fetch('https://api.airtable.com/v0/meta/whoami', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Airtable API error (${response.status}): ${errorText}`);
    }

    // Parse the response
    const data = await response.json();

    // Set outputs based on the response
    if (userIdVariable && data.id) {
      setOutput(userIdVariable, data.id);
      log(`Retrieved user ID: ${data.id}`);
    }

    // Set email output if available and requested
    if (emailVariable && data.email) {
      setOutput(emailVariable, data.email);
      log(`Retrieved user email: ${data.email}`);
    } else if (emailVariable && !data.email) {
      log(
        "Note: Email was not returned by the API. This may be due to missing 'user.email:read' scope.",
      );
    }

    // Set scopes output if available and requested
    if (scopesVariable && data.scopes) {
      setOutput(scopesVariable, data.scopes);
      log(`Retrieved ${data.scopes.length} scopes for this token`);
    } else if (scopesVariable && !data.scopes) {
      log(
        "Note: Scopes were not returned by the API. This may be because you're using a personal access token rather than an OAuth token.",
      );
    }

    log('Successfully retrieved user information from Airtable');
  } catch (error) {
    // Handle any errors
    const errorMessage = error instanceof Error ? error.message : String(error);
    log(`Error retrieving user information: ${errorMessage}`);
    throw error;
  }
};
