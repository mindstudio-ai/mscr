# Delete List Member Permanently

This action permanently deletes a member from a MailChimp list, removing all personally identifiable information related to that member. Once deleted, the member cannot be re-imported to the list.

## Configuration

### Member Information

- **List ID**: Enter the unique identifier for your MailChimp list (audience). You can find this in your MailChimp account under Audience settings.
  
  Example: `a1b2c3d4e5`

- **Email Address**: Enter the email address of the list member you want to permanently delete.
  
  Example: `user@example.com`

### Confirmation

- **Confirm Deletion**: Select "Yes, permanently delete this member" to proceed with the deletion. This action cannot be undone.

- **Output Variable**: Name of the variable that will store the result of the operation.

## Important Notes

- This action is **permanent** and cannot be reversed.
- All personally identifiable information related to the member will be removed from the list.
- The deletion complies with data privacy regulations by completely removing the member's data.
- After deletion, it will be impossible to re-import this member to the list.

## Troubleshooting

- If you receive an error about the member not being found, verify that the email address and List ID are correct.
- Ensure your MailChimp API key has sufficient permissions to delete list members.