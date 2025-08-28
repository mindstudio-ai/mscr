# Update Webhook

This connector allows you to update an existing webhook configuration in HeyReach.

## Configuration

### Webhook Details

- **Webhook ID**: Enter the unique identifier of the webhook you want to update. This is required.
  
- **Webhook Name** (optional): Enter a new name for the webhook. Leave empty to keep the original name.
  
- **Webhook URL** (optional): Enter a new URL where webhook notifications will be sent. Leave empty to keep the original URL.
  
- **Event Type** (optional): Select the type of event that will trigger the webhook. Leave empty to keep the original event type.
  
- **Campaign IDs** (optional): Enter a comma-separated list of campaign IDs that this webhook should monitor. For example: `123,456,789`. 
  - Leave empty to keep the original campaign IDs
  - Enter `[]` to make the webhook listen to all campaigns
  
- **Is Active** (optional): Choose whether the webhook should be active:
  - **Enabled**: Sets the webhook to active
  - **Disabled**: Sets the webhook to inactive
  - **Keep Original Status**: Maintains the current active/inactive status

### Response

- **Output Variable**: Enter a name for the variable that will store the API response.

## Example

To update a webhook with ID 1234 to monitor all campaigns for connection requests and change its name:

1. Set **Webhook ID** to `1234`
2. Set **Webhook Name** to `Connection Monitor`
3. Set **Event Type** to `Connection Request Sent`
4. Set **Campaign IDs** to `[]`
5. Set **Is Active** to `Enabled`
6. Set **Output Variable** to `webhookUpdateResult`