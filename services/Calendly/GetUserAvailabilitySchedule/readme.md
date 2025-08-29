# Get User Availability Schedule

This connector retrieves a user's availability schedule from Calendly, providing details about when a specific Calendly user is available for meetings.

## Configuration

### Schedule ID
Enter the unique identifier for the availability schedule you want to retrieve. This is typically found in the URL when viewing a schedule in Calendly or can be obtained from the Calendly API.

Example: `ABCDEFGHIJKLM`

### Output Variable
Specify a name for the variable where the availability schedule details will be stored. This variable will contain the complete response from Calendly, including:

- Schedule resource details
- User information
- Availability rules
- Default availability rule
- Timezone information

## Usage Notes

- This connector requires a valid Calendly OAuth connection
- The schedule ID must belong to a user in your Calendly organization
- If you receive an error, verify that the schedule ID is correct and that your Calendly account has permission to view the requested schedule

## Example Response

```json
{
  "resource": {
    "uri": "https://api.calendly.com/user_availability_schedules/ABCDEFGHIJKLM",
    "name": "Working Hours",
    "user": "https://api.calendly.com/users/USERID",
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
      }
    ]
  }
}
```