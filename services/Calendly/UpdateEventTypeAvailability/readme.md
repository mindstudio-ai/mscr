# Update Event Type Availability

This connector allows you to update the availability schedules for a Calendly event type.

## Configuration

### Event Type UUID
Enter the UUID of the event type you want to update. This is the unique identifier for your event type and can be found in the URL when viewing the event type in Calendly.

For example, if your event type URL is:
```
https://calendly.com/d/abc-123/my-event?month=2023-11
```

The UUID would be the part after `/d/` and before the event name: `abc-123`.

### Availability Rules
Enter a JSON array of availability rules that define when your event type is available for booking. Each rule specifies days and time intervals.

#### Example formats:

**Weekday rules** (type: "wday"):
```json
[
  {
    "type": "wday",
    "days": [1, 2, 3, 4, 5],
    "intervals": [
      { "from": "09:00", "to": "17:00" }
    ]
  }
]
```
This example makes the event available Monday through Friday (1-5) from 9 AM to 5 PM.

**Multiple time blocks per day**:
```json
[
  {
    "type": "wday",
    "days": [1, 2, 3, 4, 5],
    "intervals": [
      { "from": "09:00", "to": "12:00" },
      { "from": "13:00", "to": "17:00" }
    ]
  }
]
```
This creates a lunch break from 12 PM to 1 PM.

**Different schedules for different days**:
```json
[
  {
    "type": "wday",
    "days": [1, 3, 5],
    "intervals": [
      { "from": "09:00", "to": "17:00" }
    ]
  },
  {
    "type": "wday",
    "days": [2, 4],
    "intervals": [
      { "from": "12:00", "to": "20:00" }
    ]
  }
]
```
This sets Monday, Wednesday, Friday to 9 AM - 5 PM, and Tuesday, Thursday to 12 PM - 8 PM.

**Note**: Days are numbered 0-6, where 0 is Sunday and 6 is Saturday.

### Output Variable
Enter a name for the variable that will store the response from Calendly.

## Notes
- This connector requires a valid Calendly OAuth connection
- You must have permission to edit the event type you're updating
- The availability rules will completely replace the existing rules for the event type