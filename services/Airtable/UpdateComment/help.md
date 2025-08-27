# Update Comment in Airtable

This connector allows you to update an existing comment on a record in your Airtable base.

## Configuration

### Base Information
- **Base ID**: Enter your Airtable base ID, which starts with "app" (e.g., `appXXXXXXXXXXXXXX`). You can find this in the URL of your Airtable base or in the API documentation section of your Airtable workspace.
- **Table ID or Name**: Enter either the table ID (starts with "tbl") or the table name exactly as it appears in Airtable.

### Comment Information
- **Record ID**: Enter the ID of the record that contains the comment you want to update. Record IDs start with "rec" (e.g., `recXXXXXXXXXXXXXX`).
- **Comment ID**: Enter the ID of the comment you want to update. Comment IDs start with "com" (e.g., `comXXXXXXXXXXXXXX`).
- **New Comment Text**: Enter the updated text for your comment. You can mention users by including their user ID in the format `@[userId]`.

  Example with user mention:
  ```
  This is my updated comment with a mention to @[usrABC123456789]
  ```

### Output
- **Output Variable**: Enter a name for the variable that will store the response from Airtable containing the updated comment information.

## Important Notes

- You can only update comments that you have created.
- The response will include details about the updated comment, including its ID, creation time, last updated time, and author information.
- If you mention users in your comment, the response will also include information about those mentioned users.

## Example Response

```json
{
  "author": {
    "email": "your.email@example.com",
    "id": "usrXXXXXXXXXXXXXX",
    "name": "Your Name"
  },
  "createdTime": "2023-01-01T12:00:00.000Z",
  "id": "comXXXXXXXXXXXXXX",
  "lastUpdatedTime": "2023-01-02T12:00:00.000Z",
  "text": "This is my updated comment"
}
```