# Get Thread from Canva

This connector retrieves detailed information about a comment thread in a Canva design.

## Prerequisites

- You need to have a Canva API token with the `comment:read` scope.
- You need to know the Design ID and Thread ID from Canva.

## Configuration

### Design ID

Enter the ID of the Canva design containing the comment thread. This is typically found in the URL of your Canva design or through the Canva API.

Example: `DAFVztcvd9z`

### Thread ID

Enter the ID of the specific comment thread you want to retrieve. You can get this ID from a previous API call that lists comments or from the Canva UI.

Example: `KeAbiEAjZEj`

### Output Variable

Specify a variable name to store the thread information returned by the API. This variable will contain all the details about the thread, including:

- Thread content (in both plaintext and markdown)
- Author information
- Creation and update timestamps
- Mentions of other users
- Thread status information

## Response Example

The output variable will contain a JSON object with thread information similar to:

```json
{
  "thread": {
    "id": "KeAbiEAjZEj",
    "design_id": "DAFVztcvd9z",
    "thread_type": {
      "type": "comment",
      "content": {
        "plaintext": "Great work [user:team]!",
        "markdown": "*_Great work_* [user:team]!"
      },
      "mentions": {
        "user:team": {
          "tag": "user:team",
          "user": {
            "user_id": "user",
            "team_id": "team",
            "display_name": "John Doe"
          }
        }
      }
    },
    "author": {
      "id": "user123",
      "display_name": "Jane Smith"
    },
    "created_at": 1692928800,
    "updated_at": 1692928900
  }
}
```