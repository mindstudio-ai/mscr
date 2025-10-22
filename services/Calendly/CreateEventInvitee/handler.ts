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
  // Extract token from environment variables
  const { token } = process.env;
  if (!token) {
    throw new Error(
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  // Extract required inputs
  const {
    eventTypeUri,
    startTime,
    inviteeName,
    inviteeEmail,
    inviteeTimezone,
    outputVariable,
    textReminderNumber,
    locationType,
    locationDetails,
    guestEmails,
  } = inputs;

  // Validate required inputs
  if (!eventTypeUri) {
    throw new Error('Event Type URI is required');
  }
  if (!startTime) {
    throw new Error('Start Time is required');
  }
  if (!inviteeName) {
    throw new Error('Invitee Name is required');
  }
  if (!inviteeEmail) {
    throw new Error('Invitee Email is required');
  }
  if (!inviteeTimezone) {
    throw new Error('Invitee Timezone is required');
  }

  // Prepare request payload
  const payload: any = {
    event_type: eventTypeUri,
    start_time: startTime,
    invitee: {
      name: inviteeName,
      email: inviteeEmail,
      timezone: inviteeTimezone,
    },
  };

  // Add optional fields if provided
  if (textReminderNumber) {
    payload.invitee.text_reminder_number = textReminderNumber;
  }

  // Add location if provided
  if (locationType && locationDetails) {
    payload.location = {
      kind: locationType,
      location: locationDetails,
    };
  }

  // Add guest emails if provided
  if (guestEmails) {
    const emails = guestEmails.split(',').map((email: string) => email.trim());
    if (emails.length > 10) {
      log('Warning: Only the first 10 guest emails will be used.');
      emails.length = 10;
    }
    payload.event_guests = emails;
  }

  log(`Creating event invitee for ${inviteeName} at ${startTime}`);

  try {
    // Make API request to Calendly
    const response = await fetch('https://api.calendly.com/invitees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // Handle API response
    if (!response.ok) {
      const errorData = await response.text();
      let errorMessage = `Calendly API error (${response.status})`;

      if (response.status === 403) {
        errorMessage =
          'Access denied. This endpoint is limited to Calendly users on paid plans (Standard and above).';
      } else if (response.status === 401) {
        errorMessage =
          'Authentication failed. Please check your Calendly connection.';
      } else if (response.status === 400) {
        errorMessage = 'Invalid request parameters. Please check your inputs.';
      } else if (response.status === 404) {
        errorMessage =
          'Event type not found. Please check your Event Type URI.';
      }

      throw new Error(`${errorMessage}: ${errorData}`);
    }

    // Parse and return the response
    const data = (await response.json()) as any;
    log(`Successfully created event invitee for ${inviteeName}`);

    // Set the output variable with the created invitee data
    setOutput(outputVariable, data.resource);
  } catch (error) {
    // Handle any errors that occur during the request
    if (error instanceof Error) {
      throw new Error(`Failed to create event invitee: ${error.message}`);
    } else {
      throw new Error(
        'An unknown error occurred while creating the event invitee',
      );
    }
  }
};
