# Get Conversation

This connector retrieves details about an individual conversation in Mailchimp.

## Prerequisites

- A Mailchimp account with API access
- Your Mailchimp API key (configured in the service settings)
- Your Mailchimp server prefix (e.g., us19) (configured in the service settings)

## Configuration

### Conversation ID

Enter the unique ID of the conversation you want to retrieve. You can find conversation IDs in your Mailchimp account or from previous API calls.

### Fields to Include (Optional)

A comma-separated list of specific fields you want to include in the response. This helps to limit the data returned if you only need certain fields.

**Example:** `id,subject,last_message.message`

### Fields to Exclude (Optional)

A comma-separated list of fields you want to exclude from the response.

**Example:** `_links,campaign_id`

### Output Variable

The name of the variable where the conversation details will be stored. You can reference this variable in subsequent steps of your workflow.

## Notes

- This endpoint retrieves data from the deprecated Conversations feature. It doesn't include newer Inbox data, but past Conversations are still available.
- The response will include details such as message count, campaign ID, list ID, unread messages count, sender information, subject, and the most recent message in the conversation.