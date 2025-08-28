# Resend MailChimp Campaign

This action allows you to resend a MailChimp campaign to specific segments of your audience, such as subscribers who didn't open the original campaign or new subscribers who joined after the campaign was sent.

## When to use this action

Use this action when you want to:
- Reach subscribers who didn't open your original campaign
- Send a campaign to subscribers who joined after the original campaign was sent
- Target subscribers who didn't click links in your original campaign
- Reach subscribers who didn't make a purchase from your original campaign

## Required inputs

### Campaign ID
Enter the unique identifier for the campaign you want to resend. You can find this ID in the URL when viewing the campaign in MailChimp or via the MailChimp API.

Example: `1a2b3c4d5e`

### Resend Type
Select the segment of your audience you want to target:
- **To Non-Openers**: Resends to subscribers who didn't open the original campaign
- **To New Subscribers**: Resends to subscribers who joined after the original campaign was sent
- **To Non-Clickers**: Resends to subscribers who didn't click any links in the original campaign
- **To Non-Purchasers**: Resends to subscribers who didn't make a purchase from the original campaign

### Output Variable
Specify a variable name to store the response from MailChimp, which will contain information about the newly created campaign.

## What happens when this action runs

When this action runs, it:
1. Connects to your MailChimp account
2. Creates a new campaign that's a copy of the original campaign
3. Sets the recipient list to the segment you specified
4. Returns information about the new campaign (but doesn't send it automatically)

You'll need to use another action to schedule or send the newly created campaign.

## Troubleshooting

If you encounter errors:
- Verify your MailChimp API key and server prefix are correctly configured
- Confirm the Campaign ID exists and is accessible with your account
- Check that the original campaign is in a state that allows resending (typically sent campaigns)
- Ensure your account has permission to create and send campaigns