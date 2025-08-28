# Identify Workspace

This connector retrieves information about your beehiiv workspace using your API token. The connector will return details including your workspace ID, name, and the owner's email address.

## What You'll Get

After running this connector, you'll receive:

- **Workspace ID**: A unique identifier for your workspace
- **Workspace Name**: The name of your workspace
- **Owner Email**: The email address of the workspace owner

## Configuration

### Output Variable

Enter a name for the variable where you want to store the workspace information. This variable will contain a JSON object with the workspace details.

## Example Output

```json
{
  "id": "work_00000000-0000-0000-0000-000000000000",
  "name": "Your Workspace Name",
  "ownerEmail": "your.email@example.com"
}
```

## Troubleshooting

If you encounter errors:

1. **Authentication Error**: Verify your beehiiv API key is correct in the service configuration
2. **Rate Limiting**: You may have exceeded your API request limits
3. **Server Error**: Try again later if beehiiv's servers are experiencing issues