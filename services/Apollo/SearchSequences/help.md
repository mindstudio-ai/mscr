# Search Sequences

This connector allows you to search for sequences that have been created for your team's Apollo account.

## Prerequisites

- You must have an Apollo account with a **master API key**
- This feature is not accessible to Apollo users on free plans

## Configuration

### Sequence Name
Enter keywords to narrow your search. The search will match sequences whose names contain these keywords.

**Example:** `marketing conference attendees` might return sequences like "Marketing Conference Attendees 2024" or "NYC Marketing Conference"

### Page Number
The page number of results to retrieve. Default is `1`.

### Results Per Page
The number of search results to return per page. Default is `10`.

### Output Variable
Enter a name for the variable that will store the search results. You can reference this variable in subsequent steps of your workflow.

## Output Format

The connector returns a JSON object with the following structure:

```json
{
  "pagination": {
    "page": 1,
    "per_page": 10,
    "total_entries": 25,
    "total_pages": 3
  },
  "breadcrumbs": [
    {
      "label": "Name",
      "signal_field_name": "q_name",
      "value": "marketing",
      "display_name": "marketing"
    }
  ],
  "emailer_campaigns": [
    {
      "id": "12345abcde",
      "name": "Marketing Campaign 2024",
      "archived": false,
      "created_at": "2024-01-15T14:30:00.000Z",
      "user_id": "user123",
      // additional sequence properties...
    },
    // more sequences...
  ]
}
```