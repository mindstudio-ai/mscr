# Get Invitee No-Show

This connector retrieves information about an invitee who did not show up for a scheduled Calendly event.

## When to use this connector

Use this connector when you need to:
- Check if an invitee was marked as a no-show
- Get details about a missed appointment
- Access no-show data for reporting or follow-up workflows

## Required inputs

### Invitee UUID
The unique identifier for the invitee who did not show up for the scheduled event. This is a UUID format string that identifies the specific invitee record in Calendly.

Example: `12345678-1234-1234-1234-123456789012`

You can find the Invitee UUID in the Calendly dashboard or from the response of other Calendly API calls like "List Invitees".

### Output Variable
The name of the variable where you want to store the no-show information. This variable will contain all the details returned by the Calendly API about the no-show record.

## Output

The connector will return a JSON object containing details about the invitee no-show, including:
- No-show UUID
- Invitee information
- Event information
- Created/updated timestamps
- Status information

Example output:
```json
{
  "resource": {
    "uri": "https://api.calendly.com/invitee_no_shows/12345678-1234-1234-1234-123456789012",
    "invitee": "https://api.calendly.com/scheduled_events/ABCDEF123456/invitees/12345678-1234-1234-1234-123456789012",
    "created_at": "2023-01-01T12:00:00.000000Z",
    "updated_at": "2023-01-01T12:00:00.000000Z"
  }
}
```

## Authentication

This connector uses your Calendly OAuth token which is managed by the platform. No additional authentication steps are required.