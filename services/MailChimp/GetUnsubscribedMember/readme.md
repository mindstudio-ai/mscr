# Get Unsubscribed Member

This connector retrieves detailed information about a specific list member who unsubscribed from a Mailchimp campaign.

## Prerequisites

- You need a Mailchimp account with API access
- Your API Key and Server Prefix must be configured in the service settings

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. This can be found in the URL when viewing a campaign in Mailchimp (e.g., `1a2b3c4d5e`).

- **Subscriber Hash**: The MD5 hash of the lowercase version of the list member's email address. You can generate this using an MD5 hash generator with the lowercase email address, or retrieve it from other Mailchimp API responses.

### Field Options (Optional)

- **Fields to Include**: A comma-separated list of specific fields you want to include in the response. This helps reduce response size if you only need certain data.
  Example: `email_address,merge_fields,vip,timestamp`

- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response.
  Example: `_links,campaign_id`

### Output

- **Output Variable**: The name of the variable where the unsubscribed member information will be stored for use in subsequent steps of your workflow.

## Response Data

The connector returns detailed information about the unsubscribed member, including:

- Email address
- Merge fields (custom fields)
- VIP status
- Timestamp of when they unsubscribed
- Reason for unsubscribing (if provided)
- Campaign and list information

## Example Use Cases

- Analyzing why subscribers are leaving your campaigns
- Creating targeted re-engagement campaigns
- Updating your CRM with unsubscribe information
- Generating reports on unsubscribe patterns