# Create One-Off Event Type

This connector creates a temporary event type in Calendly that doesn't appear in your regular event types list. One-off event types are ideal for special or limited-time meetings.

## Configuration

### Event Type Details

- **Event Name**: The name of your event (e.g., "Sales Call", "Interview", "Product Demo")
- **Description**: Optional details about the meeting that will be shown to invitees
- **Color**: Optional hex color code for your event (e.g., `#FF0000` for red)
- **Duration**: Length of the meeting in minutes (e.g., `30` for a 30-minute meeting)

### Scheduling Options

- **Custom URL Slug**: Optional custom URL path (letters, numbers, and hyphens only)
- **Event Kind**: Choose the meeting format:
  - One-on-One: For meetings with a single attendee
  - Group: For meetings with multiple attendees
  - Collective: For team-based scheduling
- **Location Type**: How the meeting will take place
- **Custom Location**: Required if you select "Custom Link" or "In Person" as the location type
  - For custom links: Enter the URL (e.g., `https://mycompany.com/meeting-room`)
  - For physical locations: Enter the address or meeting details

### Availability

- **Scheduling Page ID**: The UUID of your Calendly scheduling page
  - This can be found in your Calendly URL: `https://calendly.com/your-username/event-name` (your-username is your scheduling page ID)
  - Or use a full UUID format like `ABCDEFGHIJKLMNO`

### Output

- **Output Variable**: Name of the variable that will store the created event type details, including the scheduling URL

## Example Response

The connector will return a response that includes the event type details and scheduling URL:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/event_types/ABCDEFGHIJKLMNO",
    "name": "Sales Call",
    "scheduling_url": "https://calendly.com/your-username/sales-call-123",
    "duration": 30,
    "kind": "solo",
    "slug": "sales-call-123",
    "description": "Discuss our product offerings",
    "color": "#FF0000"
  }
}
```

You can access the scheduling URL from the output variable to share with invitees.