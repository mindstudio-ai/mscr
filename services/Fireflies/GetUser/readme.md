# Get User Details from Fireflies.ai

This connector allows you to retrieve user information from Fireflies.ai, including personal details, integration information, group memberships, and usage statistics.

## Configuration

### User Selection

- **User ID**: Enter the ID of the specific user you want to retrieve information for. If left blank, the connector will return information for the owner of the API key.

### Fields to Return

Select which types of information you want to include in the response:

- **Include Basic Info**: When set to "Yes", returns the user's name, email, and user ID.
- **Include Integration Info**: When set to "Yes", returns a list of integrations the user has configured.
- **Include User Groups**: When set to "Yes", returns information about the user groups the user belongs to, including group members.
- **Include Usage Stats**: When set to "Yes", returns usage statistics such as minutes consumed and number of transcripts.

### Output

- **Output Variable**: The name of the variable where the user details will be stored. This variable will contain a JSON object with all the requested user information.

## Example Response

When all options are enabled, the output will look similar to this:

```json
{
  "user_id": "user_123456",
  "name": "Justin Fly",
  "email": "justin@example.com",
  "is_admin": true,
  "integrations": ["zoom", "google_calendar", "slack"],
  "minutes_consumed": 450,
  "num_transcripts": 25,
  "user_groups": [
    {
      "id": "group_123",
      "name": "Marketing Team",
      "handle": "marketing",
      "members": [
        {
          "user_id": "user_123456",
          "first_name": "Justin",
          "last_name": "Fly",
          "email": "justin@example.com"
        },
        {
          "user_id": "user_789012",
          "first_name": "Jane",
          "last_name": "Smith",
          "email": "jane@example.com"
        }
      ]
    }
  ]
}
```

## Common Errors

- **object_not_found (user)**: The user ID you specified doesn't exist.
- **not_in_team**: The user ID you specified is not in your team.