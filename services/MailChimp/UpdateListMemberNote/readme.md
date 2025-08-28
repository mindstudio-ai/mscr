# Update List Member Note

This action allows you to update an existing note for a specific member in your Mailchimp list.

## Prerequisites

- A Mailchimp account with API access
- A list with members
- An existing note for a member that you want to update

## Configuration

### List and Member Information

- **List ID**: Enter the unique identifier for your Mailchimp list. You can find this in your Mailchimp account under the list settings.
- **Subscriber Hash or Email**: You can enter either:
  - The email address of the list member
  - The MD5 hash of the lowercase version of the member's email address
- **Note ID**: The unique identifier of the note you want to update. You can get this ID from the Mailchimp API when listing member notes.

### Note Content

- **Note Content**: Enter the new content for the note. This is limited to 1,000 characters.

### Output

- **Output Variable**: The name of the variable where the response will be stored. This will contain details about the updated note, including its ID, creation date, last update date, and content.

## Example Response

```json
{
  "id": 123,
  "created_at": "2023-01-01T12:00:00Z",
  "created_by": "user@example.com",
  "updated_at": "2023-01-02T12:00:00Z",
  "note": "Updated note content",
  "list_id": "abc123def",
  "email_id": "md5hash",
  "contact_id": "contact123"
}
```