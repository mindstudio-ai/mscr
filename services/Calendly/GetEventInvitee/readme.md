# Get Event Invitee

This connector retrieves detailed information about a specific invitee for a Calendly event. It allows you to access comprehensive data about someone who has scheduled a meeting, including their contact information, responses to questions, and event details.

## Configuration

### Event UUID
Enter the UUID of the scheduled event you want to retrieve invitee information from. This is typically found in the event URL or in previous API responses.

Example: `123e4567-e89b-12d3-a456-426614174000`

### Invitee UUID
Enter the UUID of the specific invitee you want to retrieve information for. This identifies the particular person who scheduled the meeting.

Example: `987e6543-e21b-12d3-a456-426614174999`

### Output Variable
Specify a variable name to store the invitee information returned by the API. This will contain all the details about the invitee, including:
- Name and email
- Status of the booking
- Scheduled time
- Responses to any custom questions
- Tracking and rescheduling information

## Usage Tips

- You can find UUIDs in Calendly URLs. For example, in the URL `https://calendly.com/username/meeting/confirmation?event_uuid=123e4567-e89b-12d3-a456-426614174000&invitee_uuid=987e6543-e21b-12d3-a456-426614174999`, the event UUID is `123e4567-e89b-12d3-a456-426614174000` and the invitee UUID is `987e6543-e21b-12d3-a456-426614174999`.
- The output can be used in subsequent steps to personalize messages or update records in other systems.