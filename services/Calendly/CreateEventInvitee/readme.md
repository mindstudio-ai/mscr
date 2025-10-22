# Create Event Invitee

This connector creates a new event invitee in Calendly, allowing you to programmatically schedule events. When you use this connector, it will trigger standard Calendly notifications, calendar invites, and workflows as if the event was booked through the Calendly UI.

## Prerequisites

- You must have a Calendly account on a paid plan (Standard or above). Users on the Free plan will receive an error.
- Your Calendly account must be connected to MindStudio.

## Configuration

### Event Details

- **Event Type URI**: The unique identifier for the event type you want to schedule. You can find this in your Calendly event type URL or through the Calendly API.
  - Example: `https://api.calendly.com/event_types/AAAAAAAAAAAAAAAA`

- **Start Time**: The start time of the scheduled event in UTC (ISO 8601 format).
  - Example: `2023-08-07T06:05:04Z`

### Invitee Information

- **Name**: The full name of the person being scheduled for the event.
  - Example: `John Smith`

- **Email**: The email address of the invitee. This is where Calendly will send confirmation emails.
  - Example: `john@example.com`

- **Timezone**: The timezone of the invitee. Must be a valid IANA timezone string.
  - Example: `America/New_York`

- **Text Reminder Number** (Optional): Phone number for SMS reminders. Must be in international format.
  - Example: `+14155551234`

### Location (Optional)

- **Location Type**: Currently supports physical locations.

- **Location Details**: The specific physical location details for the meeting.
  - Example: `123 Main St, Suite 100, New York, NY`

### Guest Information (Optional)

- **Guest Emails**: A comma-separated list of email addresses for additional guests (maximum 10).
  - Example: `guest1@example.com, guest2@example.com`

## Output

The connector will return comprehensive information about the created event invitee, including:
- Invitee URI
- Event details
- Cancellation and rescheduling links
- Status information

This information will be stored in the variable you specify in the "Output Variable Name" field.

## Limitations

- You can add a maximum of 10 guest emails.
- This connector requires a paid Calendly plan (Standard or above).
