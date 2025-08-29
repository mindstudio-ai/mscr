# List User Busy Times

This connector retrieves a list of busy times for a Calendly user within a specified date range. Use this to check when a user is unavailable for scheduling.

## Configuration

### User Selection
- **User UUID**: Enter the UUID of the Calendly user whose busy times you want to retrieve. This is the unique identifier for the user in Calendly's system.
  - You can find this in the Calendly user profile URL. For example, in `https://calendly.com/username/meeting`, the user UUID would be associated with "username".
  - To get the actual UUID, you may need to use the Calendly API to look up the user by their username first.

### Date Range
- **Start Time**: The beginning of the time period for which you want to check busy times.
  - Must be in ISO-8601 format: `YYYY-MM-DDThh:mm:ssZ`
  - Example: `2023-01-01T00:00:00Z` for January 1st, 2023 at midnight UTC

- **End Time**: The end of the time period for which you want to check busy times.
  - Must be in ISO-8601 format: `YYYY-MM-DDThh:mm:ssZ`
  - Example: `2023-01-31T23:59:59Z` for January 31st, 2023 at 11:59:59 PM UTC
  - The maximum range between start and end time is typically 60 days

### Output
- **Output Variable**: Name of the variable where the busy times data will be stored.
  - The output will contain an array of busy time objects, each with start and end times.

## Example Output

```json
{
  "collection": [
    {
      "start_time": "2023-01-15T14:00:00Z",
      "end_time": "2023-01-15T14:30:00Z",
      "calendly_event_id": "ABCDEFGHIJKLMNOP",
      "external_event_id": null
    },
    {
      "start_time": "2023-01-16T09:00:00Z",
      "end_time": "2023-01-16T10:00:00Z",
      "calendly_event_id": null,
      "external_event_id": "external_123456"
    }
  ],
  "pagination": {
    "count": 2,
    "next_page": null
  }
}
```

## Notes
- The connector uses the Calendly API v2
- The date range should be reasonable (typically under 60 days) to avoid performance issues
- Times are returned in UTC timezone