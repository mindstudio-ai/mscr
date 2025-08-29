# Retrieve Workspace

This connector retrieves detailed information about a specific Typeform workspace.

## What this connector does

The Retrieve Workspace connector fetches information about a specific workspace in your Typeform account, including:

- Workspace ID and name
- Number of forms in the workspace
- Links to access the workspace and its forms
- Sharing status (whether it's shared with a team)
- Workspace members (if any)

## Configuration

### Workspace ID

Enter the unique identifier for the workspace you want to retrieve. You can find workspace IDs:

1. In the URL when viewing a workspace in Typeform (e.g., `https://admin.typeform.com/workspaces/xxxxxxxx`)
2. By using the Typeform API to list all workspaces

Example: `abc123de-45fg-67hi-89jk-lmnopq123456`

### Output Variable

Enter a name for the variable that will store the workspace information. You can reference this variable in subsequent steps of your workflow.

Example: `typeformWorkspace`

## Output

The connector returns a JSON object with workspace details that you can use in your workflow:

```json
{
  "id": "abc123de-45fg-67hi-89jk-lmnopq123456",
  "name": "Marketing Team",
  "forms": {
    "count": 12,
    "href": "https://api.typeform.com/forms?workspace_id=abc123de-45fg-67hi-89jk-lmnopq123456"
  },
  "self": {
    "href": "https://api.typeform.com/workspaces/abc123de-45fg-67hi-89jk-lmnopq123456"
  },
  "shared": true,
  "members": [
    {
      "email": "user@example.com",
      "name": "John Doe",
      "role": "owner"
    }
  ]
}
```

## Authentication

This connector uses OAuth authentication which is managed by MindStudio. You'll need to connect your Typeform account before using this connector.