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
  const { apiKey } = process.env;
  if (!apiKey) {
    throw new Error(
      'Missing API Key. Please configure your Fireflies.ai API key in the service settings.',
    );
  }

  const { includeUserGroups, outputVariable } = inputs;

  // Determine if we should include user groups in the query
  const includeGroups = includeUserGroups === 'true';

  log('Fetching users from Fireflies.ai...');

  // Construct the GraphQL query based on configuration
  let userGroupsFragment = '';
  if (includeGroups) {
    userGroupsFragment = `
      user_groups {
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
    `;
  }

  const query = `
    query Users {
      users {
        user_id
        email
        name
        num_transcripts
        recent_meeting
        minutes_consumed
        is_admin
        integrations
        ${userGroupsFragment}
      }
    }
  `;

  try {
    // Make the GraphQL request to Fireflies.ai API
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      { query },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check if the response contains errors
    if (response.data.errors) {
      throw new Error(`GraphQL Error: ${response.data.errors[0].message}`);
    }

    // Extract users from the response
    const users = response.data.data.users;

    log(`Successfully retrieved ${users.length} users from Fireflies.ai`);

    // Set the output variable with the users data
    setOutput(outputVariable, users);
  } catch (error) {
    // Handle errors and provide meaningful error messages
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `Failed to fetch users: ${error.response.status} ${error.response.statusText}`,
        );
      } else if (error.request) {
        throw new Error(
          'Failed to fetch users: No response received from Fireflies.ai API',
        );
      } else {
        throw new Error(`Failed to fetch users: ${error.message}`);
      }
    }
    throw error;
  }
};
