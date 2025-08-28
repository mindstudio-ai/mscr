# Delete Campaign Feedback

This action removes a specific feedback message from a MailChimp campaign.

## Prerequisites

- You need a MailChimp account with API access
- You need to have your MailChimp API key and server prefix configured in the connector settings
- The campaign must exist in your MailChimp account
- You need to know both the Campaign ID and Feedback ID

## Configuration

### Campaign ID

Enter the unique identifier for the campaign from which you want to delete feedback. This is typically a string of letters and numbers (e.g., `b934e957ab`).

You can find the Campaign ID in the URL when viewing a campaign in MailChimp, or by using the List Campaigns action.

### Feedback ID

Enter the unique identifier for the specific feedback message you want to delete. This is also typically a string of letters and numbers.

You can find the Feedback ID by first retrieving all feedback for a campaign using the Get Campaign Feedback action.

## What happens when this action runs?

When this action runs, it will permanently delete the specified feedback message from the campaign. This action cannot be undone.

If successful, the action will complete without returning any data. If there's an error (such as if the feedback message doesn't exist), the action will fail with an appropriate error message.