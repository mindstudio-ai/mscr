# List Event Type Availability Schedules

This connector retrieves the availability schedules for a specific event type in Calendly. It allows you to view when a particular event type is available for scheduling.

## Configuration

### Event Type UUID
Enter the UUID of the event type you want to retrieve availability schedules for. This is a unique identifier for your Calendly event type.

**Where to find it:** The UUID can be found in the URL of your event type in Calendly. For example, if your event type URL is:
```
https://calendly.com/your-name/meeting-type/267c5d10-9940-4f10-8f8a-d5fc332b2d6f
```
The UUID would be: `267c5d10-9940-4f10-8f8a-d5fc332b2d6f`

### Pagination Options

#### Count
The maximum number of results to return per page. Default is 25, and the maximum allowed is 100.

#### Page Token
If you're paginating through a large set of results, you can use this field to specify which page of results to return. Leave empty for the first page. The response will include a `next_page_token` if there are more results available.

### Output Variable
Specify a name for the variable that will store the availability schedules result. This variable will contain all the schedule information returned by the Calendly API.

## Example Response

The output will be a JSON object containing the availability schedules, similar to this:

```json
{
  "collection": [
    {
      "resource": {
        "uri": "https://api.calendly.com/availability_schedules/ABCDEFGHIJKLMNOP",
        "name": "Working Hours",
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
          {
            "type": "wday",
            "wday": "tuesday",
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
  ],
  "pagination": {
    "count": 25,
    "next_page": null,
    "next_page_token": null,
    "previous_page": null,
    "previous_page_token": null
  }
}
```

## Notes

- This connector requires authentication with Calendly, which is handled automatically by MindStudio.
- If the event type UUID doesn't exist, you'll receive an error message.