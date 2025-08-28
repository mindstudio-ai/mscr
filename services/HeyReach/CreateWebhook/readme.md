# Create Webhook

This action creates a new webhook in HeyReach that listens to specified LinkedIn events, optionally filtered by campaign IDs.

## Configuration

### Webhook Configuration

- **Webhook Name**: Enter a descriptive name for your webhook to easily identify it in HeyReach.
- **Webhook URL**: The URL where HeyReach will send webhook events. This should be a publicly accessible endpoint that can receive POST requests.
- **Event Type**: Select the type of LinkedIn event that will trigger this webhook. Options include:
  - Connection Request Sent
  - Connection Request Accepted
  - Message Sent
  - Message Reply Received
  - InMail Sent
  - InMail Reply Received
  - Follow Sent
  - Liked Post
  - Viewed Profile
  - Campaign Completed
  - Lead Tag Updated

### Campaign Filter (Optional)

- **Campaign IDs**: If you want to filter events to specific campaigns, enter the campaign IDs separated by commas. Leave this field empty to listen to events from all campaigns.

  Example: `campaign123,campaign456,campaign789`

### Output

- **Output Variable**: Enter a name for the variable that will store the webhook creation result. This variable can be referenced in subsequent steps of your workflow.

## Example Use Cases

- Get notified when a connection request is accepted
- Track when messages are sent or replies are received
- Monitor campaign completion
- Trigger automations when leads' tags are updated

## Notes

- The webhook will be created with the API key configured in your HeyReach service connection
- Make sure your webhook URL is publicly accessible and can handle POST requests
- The webhook will receive event data in JSON format