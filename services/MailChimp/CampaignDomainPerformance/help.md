# Get Campaign Domain Performance

This connector retrieves domain performance statistics for a specific Mailchimp campaign, showing how your campaign performed across different email domains (like gmail.com, hotmail.com, etc.).

## Prerequisites

- You need a Mailchimp account with API access
- You must have already created and sent a campaign
- You need your Mailchimp API key and server prefix configured in the connector settings

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for your Mailchimp campaign. You can find this in your Mailchimp dashboard or in the URL when viewing a campaign (e.g., `abc123def`).

### Optional Parameters

- **Fields to Include**: Specify which fields you want to include in the results. This helps reduce response size if you only need certain data points. Use comma-separated values, and dot notation for nested fields.
  
  Example: `domains.domain,domains.opens,domains.clicks,total_sent`

- **Fields to Exclude**: Specify which fields you want to exclude from the results. Use comma-separated values, and dot notation for nested fields.
  
  Example: `domains.bounces_pct,domains.clicks_pct`

### Output

- **Output Variable**: Name of the variable that will store the domain performance results. You can reference this variable in subsequent steps of your workflow.

## Output Data

The connector returns detailed statistics about how your campaign performed across different email domains, including:

- Number of emails sent to each domain
- Open rates by domain
- Click rates by domain
- Bounce rates by domain
- Unsubscribe rates by domain
- Delivery rates by domain

This data helps you understand which email providers your audience uses and how your campaign performed with different email services.