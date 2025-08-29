# List User Availability Schedules

This connector retrieves a list of availability schedules for a specified Calendly user. Availability schedules define when a user is available for meetings.

## Configuration

### User URI
Enter the URI of the Calendly user whose availability schedules you want to retrieve. The URI follows this format:
```
https://api.calendly.com/users/{UUID}
```

Where `{UUID}` is the unique identifier for the user.

Example:
```
https://api.calendly.com/users/ABCDEF123456
```

You can find your user UUID by:
1. Going to your Calendly account
2. Navigating to "Integrations" or "API & Webhooks" section
3. Looking for your user ID in the API documentation or settings

### Output Variable
Specify a variable name to store the list of availability schedules. This variable will contain an array of schedule objects, each with:
- ID
- Name
- Default status
- Time zone
- Availability rules

## Example Response

The connector will return data in this format:

```json
{
  "collection": [
    {
      "resource": {
        "uri": "https://api.calendly.com/user_availability_schedules/SCHEDULE_UUID",
        "name": "Working Hours",
        "user": "https://api.calendly.com/users/USER_UUID",
        "default": true,
        "timezone": "America/New_York",
        "rules": [
          {
            "type": "wday",
            "wday": "monday",
            "intervals": [
              {
                "from": "09:00",
                "to": "17:00"
              }
            ]
          },
          // Additional rules for other days
        ]
      }
    },
    // Additional schedules
  ]
}
```

## Troubleshooting

- Ensure you have the correct User URI format
- Verify that your Calendly authentication is properly configured
- If you receive an error, check that the user exists and that you have permission to access their schedules