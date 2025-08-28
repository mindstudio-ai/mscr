# Delete Campaign

This action allows you to permanently delete a campaign from your Mailchimp account.

## Prerequisites
- You need your Mailchimp API key and server prefix configured in your connection settings.
- You must know the Campaign ID of the campaign you want to delete.

## Configuration

### Campaign ID
Enter the unique identifier for the campaign you want to delete. You can find this in your Mailchimp dashboard or by using the "List Campaigns" action.

Example: `a1b2c3d4e5`

### Confirmation Message
This is an optional field that lets you customize the success message that will be returned when the campaign is successfully deleted. The default message is "Campaign deleted successfully".

## Important Notes
- This action permanently deletes the campaign. This cannot be undone.
- You can only delete campaigns that are in a draft or paused state.
- Deleted campaigns cannot be recovered, so make sure you have any necessary data backed up before deletion.