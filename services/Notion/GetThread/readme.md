# Canva - Get Thread

This connector retrieves metadata for a comment thread on a Canva design.

## Configuration

### Thread Information

- **Design ID**: Enter the ID of your Canva design. This is typically found in the URL of your design (e.g., `DAFVztcvd9z`).
- **Thread ID**: Enter the ID of the comment thread you want to retrieve information about (e.g., `KeAbiEAjZEj`).

### Output

- **Output Variable**: Enter a name for the variable that will store the thread information. This variable will contain all the details of the comment thread, including its content, author information, timestamps, and more.

## Example Response

The output will contain detailed information about the thread, similar to this:

```json
{
  "thread": {
    "id": "KeAbiEAjZEj",
    "design_id": "DAFVztcvd9z",
    "thread_type": {
      "type": "comment",
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
      "assignee": {
        "id": "uKakKUfI03Fg8k2gZ6OkT",
        "display_name": "John Doe"
      },
      "resolver": {
        "id": "uKakKUfI03Fg8k2gZ6OkT",
        "display_name": "John Doe"
      }
    },
    "author": {
      "id": "uKakKUfI03Fg8k2gZ6OkT",
      "display_name": "John Doe"
    },
    "created_at": 1692928800,
    "updated_at": 1692928900
  }
}
```

## Authentication

This connector uses your Canva API token for authentication, which should be configured in the Notion service settings.