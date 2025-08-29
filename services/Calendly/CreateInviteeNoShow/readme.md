# Create Invitee No Show

This connector allows you to mark an invitee as a "no-show" for a scheduled Calendly event. This is useful for tracking attendance and maintaining accurate records of your meetings.

## Prerequisites

- A Calendly account with OAuth authentication set up
- The UUID of the invitee who didn't show up for the meeting

## Configuration

### Invitee UUID

Enter the UUID of the invitee who didn't show up for the scheduled event. This is a unique identifier for the specific invitee booking.

Example format: `12345678-1234-1234-1234-123456789abc`

You can find the invitee UUID in the URL of the invitee page or from the Calendly API when listing invitees for an event.

### Output Variable

Specify a variable name to store the result of the operation. This will contain the full response from Calendly, including confirmation that the invitee was marked as a no-show.

## What happens when this connector runs?

When executed, this connector will:

1. Send a request to the Calendly API to mark the specified invitee as a no-show
2. Return the API response with details about the created no-show record
3. Store the result in your specified output variable for use in subsequent steps

## Troubleshooting

If you encounter errors:
- Verify that the invitee UUID is correct and belongs to an actual scheduled event
- Ensure your Calendly OAuth connection is properly authenticated
- Check that the invitee hasn't already been marked as a no-show