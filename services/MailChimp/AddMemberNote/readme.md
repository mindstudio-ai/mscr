# Add Member Note

This connector adds a note to a specific subscriber in a MailChimp list.

## Prerequisites
- You need a MailChimp account with API access
- You need to know the List ID of the list containing the subscriber
- The subscriber must already exist in the list

## Configuration

### List ID
Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience > Settings > Audience name and defaults, or in the URL when viewing your audience.

Example: `a1b2c3d4e5`

### Subscriber Email
Enter the email address of the subscriber to whom you want to add a note. The email must match exactly with the subscriber's email in your MailChimp list.

Example: `subscriber@example.com`

### Note
Enter the content of the note you want to add to the subscriber. Notes are limited to 1,000 characters.

### Output Variable
Enter a name for the variable that will store the API response. This response includes details such as the note ID, creation time, and author.

## Response Example

```json
{
  "id": 123456,
  "created_at": "2023-06-15T14:30:00+00:00",
  "created_by": "John Doe",
  "updated_at": "2023-06-15T14:30:00+00:00",
  "note": "Customer requested information about our premium plan",
  "list_id": "a1b2c3d4e5",
  "email_id": "md5hashofemail",
  "contact_id": "contact123"
}
```
