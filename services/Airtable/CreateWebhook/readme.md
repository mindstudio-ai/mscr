# Create Webhook

This connector creates a new webhook in your Airtable base to receive notifications when data changes.

## What You'll Need

- Your Airtable Base ID
- (Optional) A notification URL that can receive webhook pings
- The type of data changes you want to monitor
- (Optional) A specific Table ID if you only want to monitor one table

## Configuration

### Base ID

Enter your Airtable Base ID. This is the part of your Airtable URL that looks like `appXXXXXXXXXXXXXX`.

Example: If your Airtable URL is `https://airtable.com/app12345abcdef/tbl67890`, then your Base ID is `app12345abcdef`.

### Notification URL (Optional)

If you have a server that can receive webhook notifications, enter its URL here. This is where Airtable will send notifications when changes occur.

Example: `https://example.com/airtable-webhook`

### Data Types

Select the type of changes you want to monitor:
- **Table Data**: Changes to records in tables (additions, modifications, deletions)
- **Table Schema**: Changes to table structure (fields, views)
- **Base Schema**: Changes to the base structure (tables, collaborators)

### Table ID (Optional)

If you only want to monitor changes to a specific table, enter the Table ID here. Leave blank to monitor all tables in the base.

The Table ID is the part of your Airtable URL that looks like `tblXXXXXXXXXXXXXX`.

Example: If your table URL is `https://airtable.com/app12345abcdef/tbl67890`, then your Table ID is `tbl67890`.

### Output Variable

Enter a name for the variable that will store the webhook information. This variable will contain:
- `id`: The webhook ID (you'll need this to manage the webhook later)
- `macSecretBase64`: A secret key used to verify webhook notifications
- `expirationTime`: When the webhook will expire (7 days from creation)

## Important Notes

- Webhooks created with this connector will expire after 7 days
- You are limited to 10 webhooks per base
- Creator-level permissions are required to create webhooks