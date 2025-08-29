# List Activity Log Entries

This connector retrieves activity log entries from your Calendly account, allowing you to monitor and track changes made within your organization.

## Basic Configuration

- **Count**: Specify how many results to return per page (1-100). Default is 10 if not specified.
- **Sort Order**: Choose whether to display newest entries first (`created_at:desc`) or oldest entries first (`created_at:asc`).
- **Action**: Filter by specific actions (e.g., `created`, `updated`, `deleted`).
- **Namespace**: Filter by resource type (e.g., `event_type`, `scheduling_link`, `user`).

## Advanced Filters

- **Page Token**: For pagination, use the `next_page_token` from a previous response to get the next page of results.
- **Actor User UUID**: Filter by the UUID of the user who performed the action.
- **Organization URI**: Filter by organization URI in the format `https://api.calendly.com/organizations/ORGANIZATION_UUID`.
- **Min/Max Created At**: Filter by date range using ISO 8601 format (e.g., `2023-01-01T00:00:00Z`).

## Output

The connector returns a JSON object containing:
- A collection of activity log entries
- Pagination information including links to the next page if available

## Example Response

```json
{
  "collection": [
    {
      "action": "created",
      "actor": {
        "type": "user",
        "uri": "https://api.calendly.com/users/ABCDEF123456"
      },
      "created_at": "2023-09-15T14:30:00.000000Z",
      "details": {
        "event_type_name": "30 Minute Meeting"
      },
      "namespace": "event_type",
      "organization": "https://api.calendly.com/organizations/ORGID123456",
      "resource": {
        "type": "event_type",
        "uri": "https://api.calendly.com/event_types/EVENTTYPE123456"
      },
      "uri": "https://api.calendly.com/activity_log_entries/LOGENTRY123456"
    }
  ],
  "pagination": {
    "count": 10,
    "next_page": "https://api.calendly.com/activity_log_entries?count=10&page_token=NEXTPAGETOKEN",
    "next_page_token": "NEXTPAGETOKEN",
    "previous_page": null,
    "previous_page_token": null
  }
}
```

## Notes

- This connector uses the Calendly V2 API
- Activity logs are only available for Organization-level accounts
- Historical data may be limited based on your Calendly plan