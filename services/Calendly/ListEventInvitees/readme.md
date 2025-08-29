# List Event Invitees

This connector retrieves a list of invitees for a specific Calendly event. Use this to get information about people who have scheduled meetings through your Calendly event links.

## Configuration

### Event Configuration

- **Event UUID**: Enter the UUID of the specific Calendly event for which you want to list invitees. This is the unique identifier for a scheduled event.
  - Example: `0123456789abcdef0123456789abcdef`
  - You can find this UUID in the URL of your Calendly event or from the Calendly API.

### Pagination Options

- **Count**: The number of invitees to return per page (between 1-100). Default is 25.
- **Page Token**: For paginating through large result sets. Leave empty for the first page. For subsequent pages, use the page token returned in the previous response.

### Output Configuration

- **Output Variable**: The name of the variable where the list of invitees will be stored. This variable will contain the full response from Calendly, including invitee details and pagination information.

## Output Format

The connector returns a JSON object containing:

```json
{
  "collection": [
    {
      "uri": "https://api.calendly.com/scheduled_events/EVENT_UUID/invitees/INVITEE_UUID",
      "status": "active",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "created_at": "2023-01-01T12:00:00.000000Z",
      "updated_at": "2023-01-01T12:00:00.000000Z",
      "event": "https://api.calendly.com/scheduled_events/EVENT_UUID",
      "tracking": {
        "utm_campaign": null,
        "utm_source": null,
        "utm_medium": null,
        "utm_content": null,
        "utm_term": null
      },
      "text_reminder_number": null,
      "rescheduled": false,
      "old_invitee": null,
      "new_invitee": null,
      "cancel_url": "https://calendly.com/cancellations/CANCEL_CODE",
      "reschedule_url": "https://calendly.com/reschedulings/RESCHEDULE_CODE",
      "payment": null,
      "no_show": null
    }
    // Additional invitees...
  ],
  "pagination": {
    "count": 25,
    "next_page": "https://api.calendly.com/scheduled_events/EVENT_UUID/invitees?count=25&page_token=NEXT_PAGE_TOKEN",
    "previous_page": null,
    "next_page_token": "NEXT_PAGE_TOKEN",
    "previous_page_token": null
  }
}
```

## Common Use Cases

- Retrieve attendee information for a specific meeting
- Export meeting participant details to other systems
- Track attendance for events and webinars
- Build custom follow-up workflows based on meeting attendance