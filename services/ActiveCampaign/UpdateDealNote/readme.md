# Update Deal Note

This connector allows you to update an existing note for a deal in ActiveCampaign.

## Prerequisites

- You need an ActiveCampaign account with API access
- You need the appropriate permissions to manage deals and their notes
- Your API Key and Account URL must be configured in the connector settings

## Configuration

### Deal Information

- **Deal ID**: Enter the ID of the deal that contains the note you want to update. This is a numeric identifier (e.g., `123`).
- **Note ID**: Enter the ID of the specific note you want to update. This is also a numeric identifier (e.g., `456`).

### Note Content

- **Note Content**: Enter the new content for the note. This will replace the existing content of the note.

### Output

- **Output Variable**: Specify a variable name to store the response from ActiveCampaign, which includes details about the updated note and the associated deal.

## Example Response

The output variable will contain a response similar to this:

```json
{
  "deals": [
    {
      "id": "1",
      "name": "Deal Name",
      "stage": "1",
      "status": "0",
      "...": "..."
    }
  ],
  "note": {
    "id": "456",
    "note": "Your updated note content",
    "cdate": "2023-06-01T13:40:04-05:00",
    "mdate": "2023-06-01T13:41:57-05:00"
  }
}
```