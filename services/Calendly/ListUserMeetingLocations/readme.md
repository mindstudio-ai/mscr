# List User Meeting Locations

This connector retrieves a list of meeting locations for a specified Calendly user. Meeting locations are the places where a user can schedule meetings, such as Zoom, Google Meet, Microsoft Teams, or in-person locations.

## When to use this connector

Use this connector when you need to:
- Get all available meeting locations for a Calendly user
- Check what meeting platforms a user has configured
- Retrieve location details before scheduling a meeting

## Configuration

### User UUID

Enter the UUID of the Calendly user whose meeting locations you want to retrieve. The UUID is a unique identifier for a Calendly user.

You can find a user's UUID in their Calendly profile URL. For example, in the URL `https://calendly.com/user/profile`, the UUID would be found in the user's profile settings or API section.

Example UUID format: `ABCDEFGHIJKLMNOPQRST`

### Output Variable

Enter a name for the variable where the list of meeting locations will be stored. This variable will contain an array of location objects with details like type, location name, and other relevant information.

## Response Format

The output will be stored in the specified variable as a JSON object with a structure similar to:

```json
{
  "collection": [
    {
      "type": "zoom",
      "location": "zoom.us/meeting",
      "status": "active"
    },
    {
      "type": "google_meet",
      "location": "meet.google.com",
      "status": "active"
    },
    {
      "type": "in_person",
      "location": "123 Main Street, Suite 456",
      "status": "active"
    }
  ],
  "pagination": {
    "count": 3,
    "next_page": null
  }
}
```

## Authentication

This connector uses OAuth authentication which is handled automatically by the platform. No additional authentication configuration is required.