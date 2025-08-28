# Get List Member Goals

This action retrieves the last 50 Goal events for a specific member on a MailChimp list.

## When to use this action

Use this action when you want to:
- Track a subscriber's goal completion events
- Analyze user engagement with your marketing campaigns
- Create automation based on subscriber goal activity

## Configuration

### List ID
Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience > Settings > Audience name and defaults.

### Subscriber Identifier
Enter one of the following:
- The subscriber's email address (e.g., user@example.com)
- The MD5 hash of the lowercase version of the subscriber's email address
- The subscriber's contact ID

### Fields to Include (Optional)
A comma-separated list of specific fields you want to include in the response. This helps reduce response size.

Example: `goals.event,goals.last_visited_at,total_items`

### Fields to Exclude (Optional)
A comma-separated list of fields you want to exclude from the response.

Example: `_links,email_id`

### Output Variable
The name of the variable where the goal events data will be stored. You can reference this variable in subsequent actions.

## Example Response

The output variable will contain a structure similar to:

```json
{
  "goals": [
    {
      "goal_id": 123,
      "event": "Purchase",
      "last_visited_at": "2023-04-15T14:30:00+00:00",
      "data": "Additional information"
    },
    {
      "goal_id": 456,
      "event": "Page Visit",
      "last_visited_at": "2023-04-14T10:15:00+00:00",
      "data": "product-page"
    }
  ],
  "list_id": "abc123def",
  "email_id": "md5hash",
  "total_items": 2
}
```