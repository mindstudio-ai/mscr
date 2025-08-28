# Delete Segment

This action allows you to delete a specific segment from a MailChimp list.

## Prerequisites

- You need a MailChimp account with API access
- You need to have configured your MailChimp API Key and Server Prefix in the connector settings
- You need to have existing lists and segments in your MailChimp account

## Required Information

### List ID

The unique identifier for the MailChimp list that contains the segment you want to delete. You can find this in your MailChimp account by:

1. Going to Audience > All Contacts
2. Click on the "Settings" dropdown
3. Select "Audience name and defaults"
4. The List ID will be displayed in the "Audience ID" field (e.g., `a1b2c3d4e5`)

### Segment ID

The unique identifier for the segment you want to delete. You can find this by:

1. Going to Audience > All Contacts
2. Click on "Segments" in the navigation
3. Find your segment in the list
4. The Segment ID can be found in the URL when you view the segment details
   (e.g., in `https://us19.admin.mailchimp.com/lists/segments/12345`, the Segment ID is `12345`)

### Success Message

Choose a variable name to store the confirmation message after the segment is successfully deleted. This variable can be used in subsequent steps of your workflow.

## What Happens

When this action runs, it will:

1. Connect to your MailChimp account using your API credentials
2. Delete the specified segment from the specified list
3. Return a success message if the deletion is completed successfully

## Important Notes

- This action permanently deletes the segment. This cannot be undone.
- Deleting a segment does not delete the contacts within that segment.
- If the segment or list doesn't exist, the action will return an error.