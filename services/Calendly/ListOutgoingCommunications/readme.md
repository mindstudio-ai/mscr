# List Outgoing Communications

This connector retrieves a list of outgoing communications from your Calendly account.

## Configuration

### Organization URI
Enter the URI of your Calendly organization. This is required and should be in the format:
```
https://api.calendly.com/organizations/ORGANIZATION_UUID
```

You can find your organization UUID in your Calendly account settings or by using the Calendly API to list your organizations.

### Status (Optional)
Filter communications by their current status:
- **All**: Show communications with any status
- **Pending**: Show only pending communications
- **Sent**: Show only sent communications
- **Failed**: Show only failed communications

### Sort (Optional)
Choose how to sort the results:
- **Created (Newest First)**: Sort by creation date, newest communications first
- **Created (Oldest First)**: Sort by creation date, oldest communications first

### Page Size (Optional)
Specify how many results to return per page (1-100). Default is 25.

### Page Token (Optional)
For pagination, enter the token received from a previous request to get the next set of results. Leave empty for the first page.

### Output Variable
Enter a name for the variable that will store the list of communications. This variable will contain the full response from Calendly, including the communications collection and pagination information.

## Output Format

The connector returns data in the following format:

```json
{
  "collection": [
    {
      "uri": "https://api.calendly.com/outgoing_communications/COMMUNICATION_UUID",
      "status": "sent",
      "created_at": "2023-01-01T12:00:00.000000Z",
      "updated_at": "2023-01-01T12:05:00.000000Z",
      "scheduled_at": "2023-01-01T12:00:00.000000Z",
      "organization": "https://api.calendly.com/organizations/ORGANIZATION_UUID",
      "recipient": {
        "email": "recipient@example.com",
        "name": "Recipient Name"
      },
      "template": {
        "uri": "https://api.calendly.com/communication_templates/TEMPLATE_UUID",
        "name": "Template Name"
      },
      "event": "https://api.calendly.com/scheduled_events/EVENT_UUID",
      "invitee": "https://api.calendly.com/scheduled_events/EVENT_UUID/invitees/INVITEE_UUID",
      "user": "https://api.calendly.com/users/USER_UUID"
    }
  ],
  "pagination": {
    "count": 25,
    "next_page": "https://api.calendly.com/outgoing_communications?page_token=NEXT_PAGE_TOKEN",
    "previous_page": "https://api.calendly.com/outgoing_communications?page_token=PREVIOUS_PAGE_TOKEN",
    "next_page_token": "NEXT_PAGE_TOKEN",
    "previous_page_token": "PREVIOUS_PAGE_TOKEN"
  }
}
```