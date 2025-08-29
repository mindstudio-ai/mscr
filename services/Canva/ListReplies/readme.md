# Canva List Replies

This connector retrieves a list of replies for a comment or suggestion thread on a Canva design.

## Prerequisites

- You need a Canva API access token with the `comment:read` scope
- The token must be configured in your environment variables

## Configuration

### Basic Configuration

- **Design ID**: Enter the ID of the Canva design containing the comment thread. This is typically found in the design URL (e.g., `DAFVztcvd9z`).
- **Thread ID**: Enter the ID of the comment thread you want to retrieve replies from (e.g., `KeAbiEAjZEj`).
- **Output Variable**: Name of the variable that will store the list of replies.

### Advanced Options

- **Maximum Number of Replies**: The maximum number of replies to return in a single request (1-100). Defaults to 50.
- **Continuation Token**: If you've already made a request and received a continuation token in the response, you can use it here to retrieve the next page of results. Leave empty for the first request.

## Output

The connector returns a JSON object containing:

```json
{
  "continuation": "RkFGMgXlsVTDbMd:MR3L0QjiaUzycIAjx0yMyuNiV0OildoiOwL0x32G4NjNu4FwtAQNxowUQNMMYN",
  "items": [
    {
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
  ]
}
```

## Pagination

If there are more replies than the specified limit, the response will include a `continuation` token. You can use this token in a subsequent request to retrieve the next page of results.