# Delete Merge Field

This action allows you to delete a specific merge field from a MailChimp list (audience).

## Prerequisites

Before using this action, make sure you have:
1. A MailChimp account
2. Your MailChimp API key (configured in the connector settings)
3. Your MailChimp server prefix (configured in the connector settings)

## Configuration

### List ID
Enter the unique identifier for the MailChimp list (audience) that contains the merge field you want to delete. You can find this ID in your MailChimp account by:
1. Going to Audience → All Contacts
2. Click on the "Settings" dropdown
3. Select "Audience name and defaults"
4. The Audience ID appears in the "Audience ID" field (it looks like `abc123def`)

### Merge Field ID
Enter the ID of the merge field you want to delete. You can find this ID by:
1. Going to Audience → All Contacts
2. Click on "Settings" dropdown
3. Select "Audience fields and *|MERGE|* tags"
4. The merge field ID is a number associated with each field

## What happens when this action runs?
When executed, this action will permanently delete the specified merge field from your MailChimp list. This action cannot be undone, so use it with caution.

## Notes
- Deleting a merge field will remove all associated data for that field across all contacts in the list
- You cannot delete required system fields like EMAIL
- If successful, the merge field will be immediately removed from your MailChimp list