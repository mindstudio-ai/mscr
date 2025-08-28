# Create a Comment in Airtable

This action creates a comment on a specific record in your Airtable base. You can create a new standalone comment or a threaded reply to an existing comment.

## Configuration

### Airtable Configuration

- **Base ID**: Enter your Airtable base ID, which starts with "app" followed by alphanumeric characters. You can find this in your Airtable API documentation or in the URL when viewing your base.
  - Example: `appABC123xyz456`

- **Table ID or Name**: Enter either the table ID (starting with "tbl") or the exact table name as it appears in your Airtable base.
  - Example: `tblXYZ789abc123` or `My Projects`

- **Record ID**: Enter the ID of the specific record you want to comment on. Record IDs start with "rec" followed by alphanumeric characters.
  - Example: `recDEF456ghi789`

### Comment Details

- **Comment Text**: Enter the text content of your comment. You can use plain text or mention users with the syntax `@[userId]`.
  - Example: `This task needs review by the end of the week.`
  - Example with user mention: `Please check this @[usrABC123] when you have time.`

- **Parent Comment ID** (Optional): If you're replying to an existing comment, enter the parent comment's ID. Comment IDs start with "com" followed by alphanumeric characters.
  - Example: `comJKL789mno123`
  - Leave blank if you're creating a new standalone comment.

### Output

- **Output Variable**: Enter a name for the variable that will store the created comment details. This variable will contain the full comment object including ID, text, creation time, and author information.
  - Example: `newComment`

## Authentication

This action uses your Airtable API token, which should be configured in your MindStudio environment settings.