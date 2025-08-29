# Delete Theme

This connector allows you to delete a theme from your Typeform account.

## Prerequisites

- You must have a Typeform account with access to themes
- Your account must be connected to MindStudio via OAuth

## Configuration

### Theme Information

1. **Theme ID** - Enter the unique identifier for the theme you want to delete
   - This can be found in the URL when viewing a theme in Typeform or via the Typeform API
   - Example: `01ABCDEF-1234-5678-9ABC-DEF123456789`

### Confirmation

1. **Confirm Deletion** - Select whether you want to proceed with deleting the theme
   - Select "Yes, delete this theme" to confirm deletion
   - Select "No, cancel operation" to abort the process
   
## Important Notes

- Theme deletion is permanent and cannot be undone
- Deleting a theme will not affect forms that are already using it
- The connector will return a success message when the theme is successfully deleted

## Troubleshooting

If you encounter an error:
- Verify that the Theme ID is correct
- Ensure your Typeform account has permission to delete the specified theme
- Check that your OAuth connection to Typeform is valid and not expired