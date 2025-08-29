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
    eventTypeUuid,
    name,
    description,
    color,
    duration,
    minimumNoticeTime,
    maximumNoticeTime,
    secret,
    kind,
    active,
    outputVariable,
  } = inputs;

  if (!eventTypeUuid) {
    throw new Error('Event Type UUID is required');
  }

  // Build request payload with only provided values
  const payload: Record<string, any> = {};

  // Add fields only if they are provided
  if (name !== undefined && name !== '') {
    payload.name = name;
  }
  if (description !== undefined && description !== '') {
    payload.description = description;
  }
  if (color !== undefined && color !== '') {
    payload.color = color;
  }
  if (duration !== undefined && duration !== '') {
    payload.duration = parseInt(duration, 10);
  }
  if (minimumNoticeTime !== undefined && minimumNoticeTime !== '') {
    payload.minimum_notice_time = parseInt(minimumNoticeTime, 10);
  }
  if (maximumNoticeTime !== undefined && maximumNoticeTime !== '') {
    payload.maximum_notice_time = parseInt(maximumNoticeTime, 10);
  }

  // Handle boolean values from select inputs
  if (secret === 'true') {
    payload.secret = true;
  }
  if (secret === 'false') {
    payload.secret = false;
  }
  if (active === 'true') {
    payload.active = true;
  }
  if (active === 'false') {
    payload.active = false;
  }

  // Add kind if provided
  if (kind !== undefined && kind !== '') {
    payload.kind = kind;
  }

  // Check if we have any fields to update
  if (Object.keys(payload).length === 0) {
    throw new Error(
      'At least one field must be provided to update the event type',
    );
  }

  log(`Updating event type with UUID: ${eventTypeUuid}`);

  try {
    const response = await fetch(
      `https://api.calendly.com/event_types/${eventTypeUuid}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ resource: payload }),
      },
    );

    if (!response.ok) {
      const errorData = (await response.json()) as any;
      throw new Error(
        `Calendly API error (${response.status}): ${JSON.stringify(errorData)}`,
      );
    }

    const data = (await response.json()) as any;
    log('Event type updated successfully');

    // Set the output variable with the response data
    setOutput(outputVariable, data);
  } catch (error) {
    if (error instanceof Error) {
      log(`Error updating event type: ${error.message}`);
      throw error;
    }
    throw new Error('Unknown error occurred while updating event type');
  }
};
