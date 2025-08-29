# Get Event - Calendly

This connector retrieves detailed information about a specific Calendly event using the Calendly API v2.

## Prerequisites

- A Calendly account with OAuth access configured
- The UUID of the Calendly event you want to retrieve

## Configuration

### Event Configuration

- **Event UUID**: Enter the unique identifier for the Calendly event you want to retrieve. This is a required field.
  - Example: `01234567-89ab-cdef-0123-456789abcdef`
  - You can find the UUID in the URL of your Calendly event or from the Calendly dashboard

### Output Configuration

- **Output Variable**: Specify a name for the variable that will store the event details. This variable will contain all the information about the event returned by the Calendly API.

## Output Data

The connector returns comprehensive event details including:

- Event name and description
- Start and end times
- Event location information
- Invitee details
- Event status
- Custom questions and answers
- Other event metadata

## Example Use Cases

- Retrieve event details to display in your application
- Check event status before sending reminders
- Access event information for reporting or analytics
- Integrate Calendly event data with other systems

## Troubleshooting

If you encounter errors:
- Verify the Event UUID is correct and properly formatted
- Ensure your Calendly OAuth connection is active and has the necessary permissions
- Check that the event exists and is accessible with your credentials