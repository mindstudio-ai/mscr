# Delete Interest in MailChimp

This action deletes a specific interest (also known as a group name) from an interest category within a MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the connector settings
- Your MailChimp server prefix must be configured in the connector settings
- You need existing lists, interest categories, and interests in your MailChimp account

## Required Information

### List ID
The unique identifier for your MailChimp list (audience). You can find this in your MailChimp account by:
1. Going to Audience → All Contacts
2. Click on the audience name
3. Select "Settings" from the dropdown
4. Click "Audience name and defaults"
5. The List ID appears in the "Audience ID" field (e.g., `a1b2c3d4e5`)

### Interest Category ID
The unique identifier for the interest category containing the interest you want to delete. To find this:
1. Go to Audience → All Contacts
2. Click "Manage Audience" → "Signup forms"
3. Select "Form builder"
4. Add or edit a "Checkboxes" or "Radio buttons" field
5. The Interest Category ID is in the URL after "interest_categories/" (e.g., `abc123def`)

### Interest ID
The unique identifier for the specific interest you want to delete. To find this:
1. Follow the steps above to locate your Interest Category
2. Click on the specific interest category
3. The Interest ID for each interest is visible in the URL when you edit a specific interest (e.g., `def456ghi`)

## After Execution

Upon successful deletion, the action will store a success message in your specified output variable. The interest will be permanently removed from your MailChimp account.

**Note**: This action cannot be undone. Make sure you want to permanently delete this interest before running the action.