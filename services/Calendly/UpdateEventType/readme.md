# Update Event Type - Calendly

This connector allows you to update an existing event type in your Calendly account. You can modify properties such as name, description, duration, color, and various booking settings.

## Prerequisites

- You need to have connected your Calendly account to MindStudio
- You need the UUID of an existing event type you want to update

## Configuration

### Event Type Details

- **Event Type UUID**: The unique identifier for the event type you want to update. You can find this in the URL of your event type page (e.g., `https://calendly.com/your-username/event-name` - the UUID is in the API, not the URL shown here) or by using the List Event Types connector.
- **Name**: The new name for your event type (leave empty to keep current name)
- **Description**: A detailed description of your event type (leave empty to keep current description)
- **Color**: The color for your event type in hexadecimal format (e.g., `#FF0000` for red)
- **Duration**: The length of the event in minutes (e.g., `30` for a 30-minute meeting)

### Booking Settings

- **Minimum Notice Time**: The minimum time in minutes before an event that someone can book (e.g., `60` for 1 hour)
- **Maximum Notice Time**: The maximum time in days ahead that someone can book (e.g., `60` for 60 days)
- **Secret**: Whether the event type should be secret (only accessible via direct link)
- **Kind**: The type of event (solo, group, round robin, or collective)

### Availability Settings

- **Active**: Whether the event type is active and available for booking

### Output

- **Output Variable**: The name of the variable where the response will be stored. This will contain the updated event type information.

## Example Response

The output variable will contain the full updated event type object, which looks similar to:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/event_types/XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX",
    "name": "Updated Meeting",
    "description": "This is an updated description",
    "duration": 30,
    "kind": "solo",
    "active": true,
    "color": "#FF0000",
    "secret": false,
    "slug": "updated-meeting",
    "scheduling_url": "https://calendly.com/username/updated-meeting"
  }
}
```

## Notes

- Only fields you provide values for will be updated; all other fields will remain unchanged
- You must provide the Event Type UUID to identify which event type to update
- The Calendly API uses V2 (V1 will be deprecated by August 27, 2025)