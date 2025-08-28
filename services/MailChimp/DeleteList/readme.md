# Delete List

This action permanently deletes a list (audience) from your Mailchimp account.

## ⚠️ Warning

Deleting a list is permanent and cannot be undone. When you delete a list, you will lose:
- All subscriber email addresses
- List history and subscriber activity
- Unsubscribe records
- Complaint records
- Bounce records
- Campaign performance data

Make sure to export and back up your list before deletion if you need to retain this information.

## Configuration

### List Information

**List ID**: Enter the unique identifier for the list you want to delete. You can find this in your Mailchimp dashboard:
1. Go to Audience → All Contacts
2. Click on "Settings" → "Audience name and defaults"
3. Scroll down to find "Audience ID"

Example: `a1b2c3d4e5`

### Confirmation

**Confirm Deletion**: You must explicitly confirm that you understand this action is permanent by selecting "Yes, I understand this action is permanent" from the dropdown.

## API Connection Requirements

This connector requires:
- A Mailchimp API Key
- Your Mailchimp Server Prefix (e.g., us19)

These should be configured in your MindStudio service connection settings.