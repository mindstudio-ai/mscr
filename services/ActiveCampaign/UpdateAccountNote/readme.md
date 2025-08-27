# Update Account Note

This connector allows you to update an existing note for an account in ActiveCampaign.

## Configuration

### Account Information
- **Account ID**: Enter the ID of the account that contains the note you want to update. This is a numeric value (e.g., "1").
- **Note ID**: Enter the ID of the specific note you want to update. This is a numeric value (e.g., "2").

### Note Content
- **Note Content**: Enter the new content for the note. This will replace the existing note content.

### Output
- **Output Variable**: Specify a name for the variable that will store the response from ActiveCampaign, containing information about the updated note.

## Example Response

The output variable will contain a JSON object with information about the updated note, similar to:

```json
{
  "accounts": [
    {
      "name": "Example Account",
      "accountUrl": "https://www.example.url",
      "id": "1"
      // additional account details...
    }
  ],
  "note": {
    "id": "2",
    "note": "Your updated note content",
    "cdate": "2017-06-01T13:42:13-05:00",
    "mdate": "2017-06-01T13:42:13-05:00",
    // additional note details...
  }
}
```

## Requirements

- You must have your ActiveCampaign API Key and Account URL configured in the connection settings.
- The account ID and note ID must exist in your ActiveCampaign account.