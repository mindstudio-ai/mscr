# List Event Type Hosts

This connector retrieves all hosts associated with a specific Calendly event type.

## What You'll Need

- A Calendly account with OAuth integration set up
- The UUID of the event type you want to list hosts for

## Finding Your Event Type UUID

The Event Type UUID is a unique identifier for your Calendly event type. You can find it in the URL when viewing the event type in Calendly:

1. Log in to your Calendly account
2. Navigate to the event type you want to use
3. Look at the URL in your browser, which will look something like:
   `https://calendly.com/d/abc-123/my-event-name`
4. The UUID is the alphanumeric string in the URL (format: `00000000-0000-0000-0000-000000000000`)

## Output

The connector will return an array of host objects with the following structure:

```json
[
  {
    "uri": "https://api.calendly.com/users/ABCDEF123456",
    "user": {
      "uri": "https://api.calendly.com/users/ABCDEF123456",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
]
```

Each host object contains information about a user who can host the specified event type.

## Common Issues

- **404 Error**: This usually means the event type UUID doesn't exist or you don't have access to it
- **401/403 Error**: Authentication or authorization issues with your Calendly account
- **Empty Results**: The event type exists but has no hosts assigned to it