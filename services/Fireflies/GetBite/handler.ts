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

  const { biteId, fieldsToInclude, outputVariable } = inputs;

  if (!biteId) {
    throw new Error('Missing Bite ID. Please provide a valid Bite ID.');
  }

  log(`Retrieving bite information for ID: ${biteId}`);

  // Construct GraphQL query based on the selected fields option
  const query = buildGraphQLQuery(fieldsToInclude);

  try {
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      {
        query,
        variables: { biteId },
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check if the response contains errors
    if (response.data.errors) {
      throw new Error(`API Error: ${response.data.errors[0].message}`);
    }

    // Check if bite data exists
    if (!response.data.data || !response.data.data.bite) {
      throw new Error('Bite not found or no data returned');
    }

    log('Successfully retrieved bite information');

    // Set the output variable with the bite data
    setOutput(outputVariable, response.data.data.bite);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw new Error(
          `API Error (${error.response.status}): ${error.response.data?.message || JSON.stringify(error.response.data)}`,
        );
      } else if (error.request) {
        throw new Error(
          'No response received from Fireflies.ai API. Please check your network connection.',
        );
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    }
    throw error;
  }
};

/**
 * Builds the GraphQL query based on the selected fields option
 */
function buildGraphQLQuery(fieldsToInclude: string): string {
  // Basic fields that will be included in all queries
  const basicFields = `
    id
    user_id
    name
    status
    summary
  `;

  // Additional fields for standard level
  const standardFields = `
    ${basicFields}
    transcript_id
    thumbnail
    preview
    start_time
    end_time
    summary_status
    media_type
    created_at
  `;

  // Complete fields for the most detailed level
  const completeFields = `
    ${standardFields}
    created_from {
      description
      duration
      id
      name
      type
    }
    captions {
      end_time
      index
      speaker_id
      speaker_name
      start_time
      text
    }
    sources {
      src
      type
    }
    privacies
    user {
      first_name
      last_name
      picture
      name
      id
    }
  `;

  // Select the appropriate fields based on the user's choice
  let fields;
  switch (fieldsToInclude) {
    case 'basic':
      fields = basicFields;
      break;
    case 'standard':
      fields = standardFields;
      break;
    case 'complete':
      fields = completeFields;
      break;
    default:
      fields = basicFields;
  }

  // Construct the full GraphQL query
  return `
    query Bite($biteId: ID!) {
      bite(id: $biteId) {
        ${fields}
      }
    }
  `;
}
