# Schedule Campaign

This action schedules a Mailchimp campaign for delivery at a specified time.

## Configuration

### Campaign Settings

- **Campaign ID**: Enter the unique identifier for the campaign you want to schedule. You can find this in your Mailchimp account or via the API.

- **Schedule Time**: Enter the date and time when you want the campaign to be sent in ISO 8601 format (e.g., `2023-12-31T12:00:00Z`). 
  - Note: Campaigns can only be scheduled to send on the quarter-hour (:00, :15, :30, :45).
  - Example: `2023-12-25T09:00:00Z` for December 25, 2023 at 9:00 AM UTC

- **Use Timewarp**: Choose whether to use Mailchimp's Timewarp feature.
  - When enabled, the campaign will be delivered to each recipient at the specified time in their local timezone.
  - For example, if you schedule for 1:00 PM, each recipient will receive it at 1:00 PM in their local time.

### Batch Delivery Settings (Optional)

- **Use Batch Delivery**: Choose whether to send your campaign in multiple batches.
  - Note: Batch Delivery cannot be used with Timewarp.

- **Batch Delay (minutes)**: If using batch delivery, specify the time delay between batches in minutes.
  - Example: `30` for a 30-minute delay between batches

- **Number of Batches**: If using batch delivery, specify how many batches to split your campaign into.
  - Example: `3` to send your campaign in three separate batches

## Important Notes

- You must have already created and prepared the campaign in Mailchimp before scheduling it.
- The campaign must be in a "Ready" state to be scheduled.
- Either Timewarp OR Batch Delivery can be used, but not both simultaneously.
- Make sure your Mailchimp API credentials are properly configured in the service settings.