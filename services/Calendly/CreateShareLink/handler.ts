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
    throw new Error('Missing Calendly authorization token');
  }

  const { eventTypeLink, maxEventCount, outputVariable } = inputs;

  if (!eventTypeLink) {
    throw new Error('Event Type Link is required');
  }

  // Extract the event type UUID from the URL
  let eventTypeUuid: string;
  try {
    // Remove trailing slash if present
    const cleanLink = eventTypeLink.endsWith('/')
      ? eventTypeLink.slice(0, -1)
      : eventTypeLink;

    // Get the last part of the URL which should be the event type UUID or slug
    eventTypeUuid = cleanLink.split('/').pop() || '';

    if (!eventTypeUuid) {
      throw new Error('Could not extract event type from the provided link');
    }
  } catch (error) {
    throw new Error(
      `Invalid event type link: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  log(`Creating share link for event type: ${eventTypeLink}`);

  // Prepare request payload
  const payload: Record<string, any> = {
    resource_link: `https://api.calendly.com/event_types/${eventTypeUuid}`,
  };

  // Add max_event_count if provided
  if (maxEventCount) {
    const count = parseInt(maxEventCount, 10);
    if (isNaN(count) || count <= 0) {
      throw new Error('Max Event Count must be a positive number');
    }
    payload.max_event_count = count;
    log(`Setting maximum event count to: ${count}`);
  }

  try {
    const response = await fetch('https://api.calendly.com/shares', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Calendly API error (${response.status}): ${errorText}`);
    }

    const data = (await response.json()) as any;

    if (!data.resource || !data.resource.booking_url) {
      throw new Error('Share link not found in response');
    }

    const shareLink = data.resource.booking_url;
    log(`Successfully created share link: ${shareLink}`);

    setOutput(outputVariable, shareLink);
  } catch (error) {
    throw new Error(
      `Failed to create share link: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};
