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
    throw new Error('Missing API Key');
  }

  const { mine, transcriptId, myTeam, limit, skip, outputVariable } = inputs;

  // Build variables object for GraphQL query
  const variables: Record<string, any> = {};

  // Add filters to variables if they exist
  if (mine) {
    variables.mine = mine === 'true';
  }
  if (transcriptId) {
    variables.transcript_id = transcriptId;
  }
  if (myTeam) {
    variables.my_team = myTeam === 'true';
  }
  if (limit) {
    variables.limit = parseInt(limit, 10);
  }
  if (skip) {
    variables.skip = parseInt(skip, 10);
  }

  // Construct the GraphQL query
  const query = `
    query Bites(
      $mine: Boolean, 
      $transcript_id: ID, 
      $my_team: Boolean, 
      $limit: Int, 
      $skip: Int
    ) {
      bites(
        mine: $mine, 
        transcript_id: $transcript_id, 
        my_team: $my_team, 
        limit: $limit, 
        skip: $skip
      ) {
        id
        transcript_id
        name
        thumbnail
        preview
        status
        summary
        user_id
        start_time
        end_time
        summary_status
        media_type
        created_at
        sources {
          src
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
        user {
          id
          name
          first_name
          last_name
          picture
        }
      }
    }
  `;

  log('Fetching bites from Fireflies.ai...');

  try {
    // Make the request to the Fireflies GraphQL API
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
      },
    );

    // Check for GraphQL errors
    if (response.data.errors) {
      const errorMessage = response.data.errors
        .map((e: any) => e.message)
        .join(', ');
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    // Extract bites from response
    const bites = response.data.data.bites;

    log(`Successfully retrieved ${bites.length} bites`);

    // Set the output variable with the bites data
    setOutput(outputVariable, bites);
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(
        `API Error: ${error.response.status} - ${error.response.data.message || JSON.stringify(error.response.data)}`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('Network Error: No response received from Fireflies.ai');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error: ${error.message}`);
    }
  }
};
