# Get List Member Note

This action retrieves a specific note for a specific member in your MailChimp audience.

## Configuration

### Member Information

- **List ID**: Enter the unique identifier for your MailChimp list/audience. You can find this in your MailChimp account under Audience > Settings > Audience name and defaults.
  
- **Subscriber Identifier**: Enter either:
  - The subscriber's email address (e.g., `user@example.com`)
  - The MD5 hash of the subscriber's lowercase email address
  - The contact_id of the subscriber

- **Note ID**: Enter the numeric ID of the note you want to retrieve. You can find note IDs by first listing all notes for a member through the MailChimp API or interface.

### Output

- **Output Variable**: Enter a name for the variable that will store the retrieved note information. This variable will contain all note details including content, creation date, and author.

## Response Data

The output variable will contain a JSON object with the following structure:

```json
{
  "id": 123,
  "created_at": "2023-01-01T12:00:00Z",
  "created_by": "John Doe",
  "updated_at": "2023-01-02T12:00:00Z",
  "note": "This is the content of the note",
  "list_id": "abc123def",
  "email_id": "md5hashofemail",
  "contact_id": "contact123"
}
```

## Prerequisites

Make sure you have configured your MailChimp API Key and Server Prefix in the service connection settings.