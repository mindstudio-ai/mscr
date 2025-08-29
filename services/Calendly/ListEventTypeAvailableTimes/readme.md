# Calendly - List Event Type Available Times

This connector allows you to retrieve available time slots for a specific Calendly event type within a given date range. This is useful for displaying available scheduling options programmatically in your workflow.

## Prerequisites

- A Calendly account with OAuth integration set up
- Event types created in your Calendly account

## Configuration

### Event Type UUID

Enter the UUID of the Calendly event type you want to check availability for. This is the unique identifier for your event type.

**Where to find it:** The UUID is part of the URL when you view your event type in Calendly. For example, in the URL `https://calendly.com/your-name/30min`, you would need to find the UUID that corresponds to this event type in your Calendly dashboard or via the API.

### Date Range

#### Start Time
The beginning of the date range to check for availability, in ISO 8601 format.

Example: `2023-12-01T00:00:00Z`

#### End Time
The end of the date range to check for availability, in ISO 8601 format.

Example: `2023-12-07T23:59:59Z`

> **Note:** The date range cannot exceed 1 month.

### Additional Options

#### Timezone (Optional)
The IANA timezone to return available times in. If not specified, the event type's default timezone will be used.

Example: `America/New_York`, `Europe/London`, `Asia/Tokyo`

### Output

#### Output Variable
Specify a name for the variable that will store the list of available time slots. This variable can be used in subsequent steps of your workflow.

## Output Format

The connector will return an array of available time slots in the following format:

```json
{
  "collection": [
    {
      "status": "available",
      "start_time": "2023-12-01T09:00:00Z",
      "invitees_remaining": 1
    },
    {
      "status": "available",
      "start_time": "2023-12-01T10:00:00Z",
      "invitees_remaining": 1
    }
  ]
}
```

You can access individual time slots using the output variable you specified.