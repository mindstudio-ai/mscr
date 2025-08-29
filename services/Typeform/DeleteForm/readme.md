# Delete Form

This connector allows you to permanently delete a Typeform form and all of its responses.

## Prerequisites

- You must have a Typeform account and be authenticated
- You need to know the form ID of the form you want to delete

## Configuration

### Form ID

Enter the unique identifier for the form you want to delete. You can find this in your form URL:

- For example, in the URL `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`
- Or in `https://form.typeform.com/to/abc123`, the form ID is `abc123`

### Confirm Deletion

You must explicitly confirm that you want to delete the form by selecting "Yes, delete this form" from the dropdown. This is a safety measure since:

- This action **cannot be undone**
- All form responses will be permanently deleted
- Anyone with links to this form will no longer be able to access it

## Important Notes

- After deletion, the form ID cannot be reused
- If you're using this form in any integrations or embedded on websites, those connections will break
- Consider exporting your form responses before deletion if you need to retain the data