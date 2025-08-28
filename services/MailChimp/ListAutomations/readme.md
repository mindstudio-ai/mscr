# List Automations

This action retrieves a list of all automation workflows in your MailChimp account. You can filter the results by various criteria to find specific automations.

## Configuration

### Filtering Options

- **Count**: The number of automations to return in a single request. Default is 10, maximum is 1000.
- **Offset**: For pagination, the number of records to skip. Use this with Count to paginate through results.
- **Status**: Filter automations by their current status:
  - All Statuses: Return automations with any status
  - Save: Return draft automations
  - Paused: Return paused automations
  - Sending: Return active automations that are currently sending
- **Before Create Time**: Only return automations created before this time (ISO 8601 format)
  - Example: `2023-10-21T15:41:36+00:00`
- **Since Create Time**: Only return automations created after this time (ISO 8601 format)
  - Example: `2023-10-21T15:41:36+00:00`

### Output Configuration

- **Output Variable**: The name of the variable where the list of automations will be stored. This variable will contain an object with the automation data, including details like ID, status, settings, and statistics.

## Example Response

The output variable will contain a response similar to this:

```json
{
  "automations": [
    {
      "id": "4e0643c792",
      "create_time": "2023-05-15T14:29:21+00:00",
      "start_time": "2023-05-15T14:30:00+00:00",
      "status": "sending",
      "emails_sent": 42,
      "recipients": {
        "list_id": "a1b2c3d4e5",
        "list_name": "My Subscribers"
      },
      "settings": {
        "title": "Welcome Series",
        "from_name": "Your Company",
        "reply_to": "hello@example.com"
      },
      "tracking": {
        "opens": true,
        "html_clicks": true,
        "text_clicks": true
      }
    }
  ],
  "total_items": 1
}
```

## Notes

- This action requires a valid MailChimp API key and server prefix to be configured in your environment variables.
- For large accounts, consider using pagination (Count and Offset) to retrieve all automations.