# Get User Groups

This connector retrieves a list of user groups from your Fireflies.ai account, including group details and members.

## Configuration

### Only My Groups
Choose whether to retrieve all user groups in your team or only the groups that you belong to:
- **Yes** - Only returns user groups that you are a member of
- **No** - Returns all user groups in your team (default)

### Output Variable
Specify a variable name to store the list of user groups. The output will be an array of user group objects with the following structure:

```json
[
  {
    "id": "group_123",
    "name": "Engineering Team",
    "handle": "engineering",
    "members": [
      {
        "user_id": "user_456",
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com"
      }
    ]
  }
]
```

## Authentication

This connector requires a Fireflies.ai API key. Make sure you've configured your API key in the Fireflies.ai service settings.

To obtain an API key, visit: https://docs.fireflies.ai/getting-started/quickstart#obtaining-authentication-credentials