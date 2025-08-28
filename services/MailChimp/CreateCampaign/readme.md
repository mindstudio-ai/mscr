# Create Campaign

This action creates a new campaign in your MailChimp account.

## What it does

Creates a new campaign with your specified settings. After creating the campaign, you'll need to add content to it and send it using other MailChimp actions.

## Required inputs

- **Campaign Type**: Choose from regular (standard HTML campaign), plaintext (text-only), RSS (automated from an RSS feed), or A/B test campaign.
- **Campaign Name**: An internal name to identify this campaign in your MailChimp account.
- **Subject Line**: The subject line recipients will see in their inbox.
- **From Name**: The sender name that will appear in recipients' inboxes.
- **Reply-To Email**: The email address that will receive replies to this campaign.
- **List ID**: The unique identifier for the audience list you want to send to. You can find this in your MailChimp account under Audience settings.

## Optional inputs

- **Preview Text**: The short preview text that appears in email clients after the subject line.
- **Include Auto Footer**: Whether to automatically include MailChimp's default footer in your campaign.
- **Inline CSS**: Whether to automatically convert CSS to inline styles, which can improve rendering in some email clients.

## Output

- **Campaign ID Output**: The ID of the newly created campaign, which you can use in subsequent actions.

## Notes

- This action only creates the campaign structure. You'll need to add content and schedule/send the campaign separately.
- To find your List ID, go to your MailChimp account, select Audience → Settings → Audience name and defaults, and look for the Audience ID.
- Make sure your API key has appropriate permissions to create campaigns.