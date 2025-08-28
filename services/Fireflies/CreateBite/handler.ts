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
      'Missing Fireflies API Key. Please check your connection settings.',
    );
  }

  // Extract required inputs
  const {
    transcriptId,
    startTime,
    endTime,
    name,
    mediaType,
    privacies,
    summary,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!transcriptId) {
    throw new Error('Transcript ID is required');
  }

  if (!startTime) {
    throw new Error('Start time is required');
  }

  if (!endTime) {
    throw new Error('End time is required');
  }

  // Convert string inputs to numbers if needed
  const startTimeFloat =
    typeof startTime === 'string' ? parseFloat(startTime) : startTime;
  const endTimeFloat =
    typeof endTime === 'string' ? parseFloat(endTime) : endTime;

  // Build variables object with required fields
  const variables: Record<string, any> = {
    transcriptId,
    startTime: startTimeFloat,
    endTime: endTimeFloat,
  };

  // Add optional fields if provided
  if (name) {
    variables.name = name;
  }
  if (mediaType) {
    variables.media_type = mediaType;
  }
  if (privacies) {
    variables.privacies = [privacies];
  } // API expects an array
  if (summary) {
    variables.summary = summary;
  }

  // Construct GraphQL mutation
  const mutation = `
    mutation CreateBite(
      $transcriptId: ID!, 
      $startTime: Float!, 
      $endTime: Float!
      ${name ? ', $name: String' : ''}
      ${mediaType ? ', $media_type: String' : ''}
      ${privacies ? ', $privacies: [String]' : ''}
      ${summary ? ', $summary: String' : ''}
    ) {
      createBite(
        transcript_id: $transcriptId, 
        start_time: $startTime, 
        end_time: $endTime
        ${name ? ', name: $name' : ''}
        ${mediaType ? ', media_type: $media_type' : ''}
        ${privacies ? ', privacies: $privacies' : ''}
        ${summary ? ', summary: $summary' : ''}
      ) {
        id
        status
        name
      }
    }
  `;

  // Prepare request data
  const requestData = {
    query: mutation,
    variables,
  };

  log(
    `Creating bite from transcript ${transcriptId} (${startTimeFloat}s to ${endTimeFloat}s)`,
  );

  try {
    // Make GraphQL request to Fireflies API
    const response = await axios.post(
      'https://api.fireflies.ai/graphql',
      requestData,
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
        .map((e: any) => e.message)
        .join(', ');
      throw new Error(`GraphQL Error: ${errorMessage}`);
    }

    // Extract the created bite data
    const biteData = response.data.data.createBite;

    log(
      `Successfully created bite${name ? ` "${name}"` : ''} with status: ${biteData.status}`,
    );

    // Set the output variable with the bite data
    setOutput(outputVariable, biteData);
  } catch (error: any) {
    // Handle request errors
    if (error.response) {
      throw new Error(
        `API Error (${error.response.status}): ${error.response.data?.message || JSON.stringify(error.response.data)}`,
      );
    } else {
      throw new Error(`Error creating bite: ${error.message}`);
    }
  }
};
