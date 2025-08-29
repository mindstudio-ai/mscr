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
  const { token } = process.env;
  if (!token) {
    throw new Error('Missing authentication token');
  }

  const {
    name,
    description,
    color,
    duration,
    slug,
    kind,
    poolingType,
    profileId,
    outputVariable,
  } = inputs;

  // Build the request payload
  const payload: any = {
    event_type: {
      name,
      kind,
      duration: parseInt(duration, 10),
      profile: {
        type: 'Profile',
        uri: `https://api.calendly.com/profiles/${profileId}`,
      },
    },
  };

  // Add optional fields if provided
  if (description) {
    payload.event_type.description = description;
  }
  if (color) {
    payload.event_type.color = color;
  }
  if (slug) {
    payload.event_type.slug = slug;
  }
  if (poolingType && kind === 'round_robin') {
    payload.event_type.pooling_type = poolingType;
  }

  log(`Creating new ${kind} event type: "${name}"`);

  try {
    // Make API request to create the event type
    const response = await fetch('https://api.calendly.com/event_types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Parse the response
    const responseData = (await response.json()) as any;

    // Handle error responses
    if (!response.ok) {
      const errorMessage = responseData.message || 'Unknown error occurred';
      const details = responseData.details
        ? JSON.stringify(responseData.details)
        : '';

      if (response.status === 401) {
        throw new Error(`Authentication failed: ${errorMessage}`);
      } else if (response.status === 403) {
        throw new Error(`Permission denied: ${errorMessage}`);
      } else if (response.status === 404) {
        throw new Error(`Resource not found: ${errorMessage}`);
      } else if (response.status === 429) {
        throw new Error(`Rate limit exceeded. Please try again later.`);
      } else {
        throw new Error(
          `Error creating event type: ${errorMessage} ${details}`,
        );
      }
    }

    log(`Successfully created event type: "${name}"`);

    // Set the output variable with the response data
    setOutput(outputVariable, responseData.resource);
  } catch (error) {
    // Handle any unexpected errors
    if (error instanceof Error) {
      throw new Error(`Failed to create event type: ${error.message}`);
    } else {
      throw new Error(
        'An unexpected error occurred while creating the event type',
      );
    }
  }
};
