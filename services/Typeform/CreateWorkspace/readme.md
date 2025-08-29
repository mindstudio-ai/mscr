# Create Workspace

This connector creates a new workspace in your Typeform account. Workspaces help you organize your forms and manage team access.

## Configuration

### Workspace Configuration

- **Workspace Name**: Enter a name for your new workspace. This is what will appear in your Typeform account.
  - Example: "Marketing Team" or "Customer Surveys"

### Output

- **Output Variable**: Choose a variable name to store the details of the created workspace. This will contain information like the workspace ID, name, and other properties.

## What happens when this runs?

When this connector runs, it will:

1. Create a new workspace in your Typeform account with the name you specified
2. Return the complete workspace details including:
   - Workspace ID
   - Workspace name
   - Account information
   - Access links
   - Sharing status

## Authentication

This connector uses your Typeform OAuth connection to authenticate requests. Make sure you've connected your Typeform account in the Connections section before using this connector.