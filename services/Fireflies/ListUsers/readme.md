# List Users - Fireflies.ai

This connector retrieves a list of all users within your Fireflies.ai team, including their details such as names, emails, and roles.

## Configuration

### Include User Groups

Choose whether to include user group information in the results:
- **Yes** - Includes detailed information about user groups and their members
- **No** - Returns only basic user information without group details

### Output Variable

Specify a name for the variable that will store the list of users. You can reference this variable in subsequent steps of your workflow.

## Output Format

The connector returns an array of user objects with the following structure:

```json
[
  {
    "user_id": "user123",
    "email": "user@example.com",
    "name": "John Doe",
    "num_transcripts": 42,
    "recent_meeting": "2023-05-15T10:30:00Z",
    "minutes_consumed": 120,
    "is_admin": true,
    "integrations": ["zoom", "teams"]
  },
  // Additional users...
]
```

If you enable "Include User Groups", each user will also include a `user_groups` field containing group information.

## Use Cases

- Retrieving team member information for reporting
- Identifying admin users in your organization
- Getting user statistics like transcript counts and minutes consumed
- Mapping users to their respective groups for organizational purposes

## Notes

- This connector requires a valid Fireflies.ai API key configured in your service connection
- You can view the same list of users on your Fireflies.ai dashboard at app.fireflies.ai/team