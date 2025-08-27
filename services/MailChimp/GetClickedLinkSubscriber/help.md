# Get Clicked Link Subscriber

This action retrieves detailed information about a specific subscriber who clicked a link in a MailChimp campaign.

## When to use this action

Use this action when you need to:
- Track which subscribers clicked on specific links in your campaigns
- Get detailed information about a subscriber who engaged with your campaign
- Analyze subscriber behavior for targeted follow-up actions

## Required information

### Campaign ID
The unique identifier for your MailChimp campaign. You can find this in your MailChimp account under the campaign details or in the URL when viewing a campaign.

### Link ID
The unique identifier for the specific link that was clicked in your campaign. This can be found in the campaign reports section under "Click Performance".

### Subscriber Hash
The MD5 hash of the lowercase version of the subscriber's email address. You can generate this programmatically or retrieve it from other MailChimp API responses.

## Output

The action returns comprehensive information about the subscriber who clicked the link, including:
- Email address
- Merge fields (custom fields)
- VIP status
- Number of clicks on the link
- List membership status
- Contact status (subscribed, unsubscribed, etc.)

## Tips

- Make sure your MailChimp API Key and Server Prefix are correctly configured in the environment variables
- The Subscriber Hash is case-sensitive, so ensure it's correctly formatted
- This action is useful for creating targeted follow-up workflows based on subscriber engagement