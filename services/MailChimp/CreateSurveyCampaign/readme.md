# Create Survey Campaign

This action creates a new email campaign linked to a survey in your MailChimp account.

## Prerequisites

- You need a MailChimp account with API access
- You need to have created a survey in MailChimp
- You need to have a list (audience) in MailChimp

## Configuration

### List and Survey

- **List ID**: Enter the unique identifier for your MailChimp list (audience). You can find this in your MailChimp account under Audience settings > Settings > Audience name and defaults.
- **Survey ID**: Enter the ID of the survey you want to link to this campaign. You can find this in the URL when viewing your survey in MailChimp.

### Campaign Details

- **Subject Line**: The subject line that recipients will see in their inbox.
- **Preview Text**: Optional text that appears in the inbox preview after the subject line in some email clients.
- **Campaign Title**: Optional internal name for your campaign (for your reference in MailChimp). If not provided, the subject line will be used.
- **From Name**: The name that will appear as the sender of the email.
- **Reply To**: The email address that will receive replies to your campaign.
- **To Name**: Optional personalization for the recipient's name. You can use merge tags like `*|FNAME|*` to personalize with the recipient's first name.

### Additional Settings

- **Use Conversation Feature**: Choose whether to use MailChimp's Conversation feature to manage replies to your campaign.

### Output

- **Output Variable**: Name of the variable that will store the created campaign ID for use in subsequent actions.

## After Creation

After the campaign is created, you'll need to send it separately through the MailChimp interface or API. This action only creates the campaign and links it to your survey.