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
    throw new Error('Missing Calendly API token');
  }

  const {
    name,
    description,
    color,
    duration,
    slug,
    kind,
    locationType,
    customLocation,
    profileId,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!name) {
    throw new Error('Event name is required');
  }
  if (!duration) {
    throw new Error('Duration is required');
  }
  if (!profileId) {
    throw new Error('Scheduling Page ID is required');
  }

  log(`Creating one-off event type: "${name}"`);

  // Prepare location data based on location type
  let location;
  if (locationType === 'link' && customLocation) {
    location = {
      type: locationType,
      location: customLocation,
    };
  } else if (locationType === 'physical' && customLocation) {
    location = {
      type: locationType,
      location: customLocation,
    };
  } else {
    location = {
      type: locationType,
    };
  }

  // Build the request payload
  const payload = {
    event_type: {
      name,
      slug: slug || undefined,
      color: color || undefined,
      description: description || undefined,
      kind,
      duration: parseInt(duration, 10),
      profile_id: profileId,
      one_off: true, // This makes it a one-off event type
      location,
    },
  };

  try {
    // Make the API request to create the event type
    const response = await fetch('https://api.calendly.com/event_types', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      log(
        `Error creating event type: ${response.status} ${response.statusText}`,
      );
      throw new Error(`Calendly API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;
    log(`Successfully created one-off event type: "${name}"`);
    log(`Event scheduling URL: ${data.resource.scheduling_url}`);

    // Set the output variable with the full response
    setOutput(outputVariable, data.resource);
  } catch (error) {
    if (error instanceof Error) {
      log(`Failed to create event type: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while creating event type');
  }
};
