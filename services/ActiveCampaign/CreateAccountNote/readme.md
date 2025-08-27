# Create Account Note

This connector creates a new note for a specific account in ActiveCampaign.

## Configuration

### Account ID
Enter the ID of the ActiveCampaign account you want to add a note to. This is a numeric identifier (e.g., `1`, `42`, `123`).

### Note Content
Enter the text content of the note you want to add to the account. You can use multiple lines for longer notes.

Example:
```
Called customer about renewal options.
They're interested in upgrading to the premium plan next month.
Follow up required by sales team.
```

### Output Variable
Enter a name for the variable that will store the response data. This variable will contain the complete response from ActiveCampaign, including details about both the account and the created note.

## Authentication

This connector requires:
- **API Key** - Your ActiveCampaign API key
- **Base Account URL** - Your ActiveCampaign account URL (e.g., https://youraccount.api-us1.com)

These should be configured in the ActiveCampaign service settings.