# Pause RSS Campaign

This action pauses an active RSS-driven campaign in Mailchimp.

## When to use this action

Use this action when you want to temporarily stop an RSS-driven campaign from sending. This is useful when:

- You need to make updates to your RSS feed
- You want to pause campaign delivery during holidays or specific periods
- You need to troubleshoot issues with your campaign content

## Prerequisites

- You must have a Mailchimp account with API access
- You need an active RSS-driven campaign in your Mailchimp account
- The campaign must be in a state that allows pausing (active/sending)

## Configuration

### Campaign ID

Enter the unique identifier for the campaign you want to pause. You can find this ID:

1. In your Mailchimp dashboard by navigating to Campaigns
2. Select the RSS campaign you want to pause
3. The ID will be in the URL (e.g., `https://us1.admin.mailchimp.com/campaigns/show/?id=123456`)
4. The Campaign ID would be `123456` in this example

### Result Variable

Enter a name for the variable that will store the result of the pause operation. This variable will contain a success message if the campaign was paused successfully.

## What happens when this action runs

When this action runs, it:

1. Connects to the Mailchimp API using your account credentials
2. Sends a request to pause the specified RSS campaign
3. If successful, the campaign will stop sending until you resume it
4. The result variable will be set with a success message

## Troubleshooting

If you encounter errors:

- Verify the Campaign ID is correct and belongs to an RSS-driven campaign
- Ensure the campaign is in a state that allows pausing
- Check that your Mailchimp API credentials are valid