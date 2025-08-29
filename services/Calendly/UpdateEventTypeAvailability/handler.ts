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
    throw new Error(
      'Missing authentication token. Please check your Calendly connection.',
    );
  }

  const { eventTypeUuid, availabilityRules, outputVariable } = inputs;

  if (!eventTypeUuid) {
    throw new Error('Event Type UUID is required');
  }

  // First, get the event type to retrieve the current availability schedule ID
  log(`Fetching event type details for ${eventTypeUuid}...`);

  const eventTypeResponse = await fetch(
    `https://api.calendly.com/event_types/${eventTypeUuid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!eventTypeResponse.ok) {
    const errorText = await eventTypeResponse.text();
    throw new Error(
      `Failed to fetch event type: ${eventTypeResponse.status} ${errorText}`,
    );
  }

  const eventTypeData = (await eventTypeResponse.json()) as any;

  // Extract the availability schedule ID from the event type
  const scheduleId = eventTypeData.resource.scheduling_url.split('/').pop();

  if (!scheduleId) {
    throw new Error(
      'Could not determine the availability schedule ID from the event type',
    );
  }

  log(`Found availability schedule ID: ${scheduleId}`);

  // Now update the availability schedule with the new rules
  log('Updating availability schedule...');

  const updateResponse = await fetch(
    `https://api.calendly.com/event_types/${eventTypeUuid}/availability_schedules/${scheduleId}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        availability_schedules: [
          {
            rules: availabilityRules,
          },
        ],
      }),
    },
  );

  if (!updateResponse.ok) {
    const errorText = await updateResponse.text();
    throw new Error(
      `Failed to update availability schedule: ${updateResponse.status} ${errorText}`,
    );
  }

  const updateData = (await updateResponse.json()) as any;

  log('Successfully updated event type availability schedule');

  // Get the updated event type to return the complete updated information
  const updatedEventTypeResponse = await fetch(
    `https://api.calendly.com/event_types/${eventTypeUuid}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!updatedEventTypeResponse.ok) {
    const errorText = await updatedEventTypeResponse.text();
    throw new Error(
      `Failed to fetch updated event type: ${updatedEventTypeResponse.status} ${errorText}`,
    );
  }

  const updatedEventTypeData = (await updatedEventTypeResponse.json()) as any;

  // Set the output variable with the updated event type data
  setOutput(outputVariable, updatedEventTypeData.resource);
};
