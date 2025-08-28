import axios from 'axios';

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
  // Extract API key from environment variables
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Fireflies.ai API key in the service settings.',
    );
  }

  // Extract inputs
  const { onlyMyGroups, outputVariable } = inputs;

  // Convert string boolean to actual boolean
  const mine = onlyMyGroups === 'true';

  log(
    `Fetching user groups from Fireflies.ai${mine ? ' (only my groups)' : ' (all groups)'}`,
  );

  // Prepare GraphQL query
  const graphqlQuery = {
    query: `
      query UserGroups($mine: Boolean) {
        user_groups(mine: $mine) {
          id
          name
          handle
          members {
            user_id
            first_name
            last_name
            email
          }
        }
      }
    `,
    variables: {
      mine,
    },
  };

  try {
    // Make request to Fireflies.ai GraphQL API
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      graphqlQuery,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for errors in the GraphQL response
    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((err: any) => err.message)
        .join(', ');
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    // Extract user groups from response
    const userGroups = response.data.data.user_groups;

    log(`Successfully retrieved ${userGroups.length} user group(s)`);

    // Set output variable with the user groups
    setOutput(outputVariable, userGroups);
  } catch (error: any) {
    // Handle different types of errors
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      if (error.response.status === 401) {
        throw new Error(
          'Authentication failed. Please check your Fireflies.ai API key.',
        );
      } else {
        throw new Error(
          `API Error (${error.response.status}): ${error.response.data?.message || 'Unknown error'}`,
        );
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error(
        'No response received from Fireflies.ai. Please check your internet connection and try again.',
      );
    } else {
      // Something happened in setting up the request
      throw error;
    }
  }
};
