# Get Comment Reply

This connector retrieves a specific reply to a comment or suggestion thread on a Canva design.

## Prerequisites

- You need to have a Canva account with API access
- Your authentication token must have the `comment:read` scope

## Configuration

### Design Information

- **Design ID**: Enter the ID of the Canva design containing the comment thread. This is typically found in the URL when viewing a design (e.g., `DAFVztcvd9z`).
- **Thread ID**: Enter the ID of the comment thread containing the reply you want to retrieve (e.g., `KeAbiEAjZEj`).
- **Reply ID**: Enter the ID of the specific reply you want to retrieve (e.g., `KeAZEAjijEb`).

### Output

- **Output Variable**: Enter a name for the variable that will store the reply information. This variable will contain the complete reply object with details such as:
  - Reply ID
  - Author information
  - Content (both plaintext and markdown)
  - Mentioned users
  - Creation and update timestamps

## Example Response

The output variable will contain a JSON object similar to:

```json
{
  "reply": {
    "id": "KeAZEAjijEb",
    "design_id": "DAFVztcvd9z",
    "thread_id": "KeAbiEAjZEj",
    "author": {
      "id": "uKakKUfI03Fg8k2gZ6OkT",
      "display_name": "John Doe"
    },
    "content": {
      "plaintext": "Great work [oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP]!",
      "markdown": "*_Great work_* [oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP]!"
    },
    "mentions": {
      "oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP": {
        "tag": "oUnPjZ2k2yuhftbWF7873o:oBpVhLW22VrqtwKgaayRbP",
        "user": {
          "user_id": "oUnPjZ2k2yuhftbWF7873o",
          "team_id": "oBpVhLW22VrqtwKgaayRbP",
          "display_name": "John Doe"
        }
      }
    },
    "created_at": 1692929800,
    "updated_at": 1692929900
  }
}
```

## Rate Limiting

This API is rate limited to 100 requests per minute per user.