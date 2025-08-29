# Get User Details

This connector retrieves the User ID and Team ID of the current Canva user associated with your authenticated account.

## What it does

When executed, this connector makes a request to the Canva API to fetch details about the currently authenticated user. The response includes:

- **User ID**: A unique identifier for the user
- **Team ID**: The identifier for the user's Canva Team

## Configuration

### Output Variable

Enter a name for the variable that will store the user details. This variable will contain a JSON object with the following structure:

```json
{
  "team_user": {
    "user_id": "auDAbliZ2rQNNOsUl5OLu",
    "team_id": "Oi2RJILTrKk0KRhRUZozX"
  }
}
```

You can reference this information in subsequent steps of your workflow using:
- `{{outputs.yourVariableName.team_user.user_id}}` to access the User ID
- `{{outputs.yourVariableName.team_user.team_id}}` to access the Team ID

## Authentication

This connector uses the Canva OAuth token that you've configured for your integration. No additional authentication parameters are required.

## Rate Limits

This operation is rate limited to 10 requests per minute for each user of your integration.