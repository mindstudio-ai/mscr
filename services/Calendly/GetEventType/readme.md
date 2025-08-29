# Get Event Type - Calendly

This connector retrieves detailed information about a specific Calendly event type using the Calendly API.

## Configuration

### Event Type UUID
Enter the UUID of the event type you want to retrieve. This is a unique identifier for your Calendly event type.

**Where to find it:**
- In the URL of your event type page (e.g., `https://calendly.com/your-name/event-name` - the UUID is in the backend)
- Via the List Event Types endpoint in Calendly API
- In your Calendly dashboard under the event type settings

Example UUID format: `01234567-89ab-cdef-0123-456789abcdef`

### Output Variable
Enter a name for the variable that will store the event type details. This variable will contain all the information about your event type, including:

- Name and description
- Duration
- Scheduling URL
- Active status
- Color and branding
- Custom questions
- Scheduling settings
- And more

## Example Response

The output will be a JSON object with detailed information about the event type:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/event_types/01234567-89ab-cdef-0123-456789abcdef",
    "name": "15 Minute Meeting",
    "description": "A brief introduction call",
    "duration": 15,
    "kind": "solo",
    "slug": "15min",
    "color": "#0088ff",
    "active": true,
    "scheduling_url": "https://calendly.com/username/15min",
    "created_at": "2023-01-01T00:00:00.000000Z",
    "updated_at": "2023-01-01T00:00:00.000000Z"
    // Additional fields will be included
  }
}
```

## Notes
- This connector uses the Calendly V2 API
- Authentication is handled automatically through your connected Calendly account