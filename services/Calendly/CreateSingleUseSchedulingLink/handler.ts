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
    throw new Error(
      'Missing authentication token. Please reconnect your Calendly account.',
    );
  }

  const {
    eventTypeUrl,
    maxEventCount,
    ownerEmail,
    expirationDays,
    outputVariable,
  } = inputs;

  // Validate required inputs
  if (!eventTypeUrl) {
    throw new Error('Event Type URL is required');
  }

  log('Creating single-use scheduling link...');

  // Extract event type UUID from URL
  const eventTypeUuid = extractEventTypeUuid(eventTypeUrl);
  if (!eventTypeUuid) {
    throw new Error(
      'Invalid Event Type URL. Please provide a valid Calendly event type URL.',
    );
  }

  // Prepare request payload
  const payload: any = {
    max_event_count: parseInt(maxEventCount, 10) || 1,
    resource: {
      uri: `https://api.calendly.com/event_types/${eventTypeUuid}`,
    },
  };

  // Add expiration if provided
  if (expirationDays && !isNaN(parseInt(expirationDays, 10))) {
    const days = parseInt(expirationDays, 10);
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    payload.expiration_date = expirationDate.toISOString();
  }

  // If owner email is provided, get the owner UUID
  if (ownerEmail) {
    try {
      log('Looking up owner information...');
      const ownerUuid = await getOwnerUuid(token, ownerEmail);
      if (ownerUuid) {
        payload.owner = `https://api.calendly.com/users/${ownerUuid}`;
        payload.owner_type = 'User';
      }
    } catch (error) {
      log(
        `Warning: Could not find owner with email ${ownerEmail}. Using authenticated user as owner.`,
      );
    }
  }

  try {
    // Make API request to create scheduling link
    const response = await fetch('https://api.calendly.com/scheduling_links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `Calendly API error: ${response.status} - ${JSON.stringify(errorData)}`,
      );
    }

    const data = (await response.json()) as any;
    const bookingUrl = data.resource.booking_url;

    log(`Successfully created scheduling link: ${bookingUrl}`);
    setOutput(outputVariable, bookingUrl);
  } catch (error) {
    log('Failed to create scheduling link');
    throw error;
  }
};

/**
 * Extracts the event type UUID from a Calendly event type URL
 */
function extractEventTypeUuid(url: string): string | null {
  // Try to extract UUID from various URL formats
  // Format: https://calendly.com/username/event-name
  const eventPathMatch = url.match(/calendly\.com\/[^\/]+\/([^\/\?]+)/);
  if (eventPathMatch && eventPathMatch[1]) {
    // This is a user-friendly URL, we need to make an API call to get the UUID
    // For now, return the event slug which can be used in the API
    return eventPathMatch[1];
  }

  // Format: https://api.calendly.com/event_types/UUID
  const apiUrlMatch = url.match(/event_types\/([a-zA-Z0-9-]+)/);
  if (apiUrlMatch && apiUrlMatch[1]) {
    return apiUrlMatch[1];
  }

  return null;
}

/**
 * Gets the UUID of a Calendly user by email
 */
async function getOwnerUuid(
  token: string,
  email: string,
): Promise<string | null> {
  try {
    const response = await fetch(
      `https://api.calendly.com/users?email=${encodeURIComponent(email)}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as any;
    if (data.collection && data.collection.length > 0) {
      // Extract UUID from the URI
      const uriParts = data.collection[0].uri.split('/');
      return uriParts[uriParts.length - 1];
    }

    return null;
  } catch (error) {
    return null;
  }
}
