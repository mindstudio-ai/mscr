# Update Mailchimp Campaign

This action allows you to update an existing Mailchimp campaign's settings.

## Prerequisites
- You must have a Mailchimp account with API access
- You need to know the Campaign ID of the campaign you want to update

## Configuration

### Campaign Details
- **Campaign ID**: Enter the unique identifier for the campaign you want to update. You can find this in your Mailchimp account or from the "Create Campaign" action output.

### Campaign Settings
- **Subject Line**: The email subject line that recipients will see
- **From Name**: The name that will appear as the sender of the campaign
- **Reply-To Email**: The email address that will receive replies to the campaign

### Output
- **Output Variable**: The name of the variable where the updated campaign details will be stored

## Example Usage
Use this action when you need to modify an existing campaign before sending it. For example, you might want to update the subject line based on dynamic content or personalize the sender name.

## Notes
- You only need to provide the fields you want to update - any fields left blank will remain unchanged
- The Campaign ID must be valid and belong to a campaign in your Mailchimp account
- The Reply-To Email must be a valid email address format
