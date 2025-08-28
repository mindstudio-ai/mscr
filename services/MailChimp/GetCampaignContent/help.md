# Get Campaign Content

This action retrieves the HTML and plain-text content for a specific MailChimp campaign.

## Configuration

### Campaign ID
Enter the unique identifier for the campaign you want to retrieve content from. You can find this ID in your MailChimp account or from the URL when viewing a campaign.

Example: `1a2b3c4d5e`

### Fields to Include (Optional)
Specify which fields you want to include in the response as a comma-separated list. This is useful to limit the response to only the data you need.

Example: `html,plain_text,archive_html`

### Fields to Exclude (Optional)
Specify which fields you want to exclude from the response as a comma-separated list.

Example: `_links,variate_contents`

### Output Variable
Enter a name for the variable that will store the campaign content data. You can reference this variable in subsequent actions.

## Response Data

The response will include:

- `html` - The HTML content of the campaign
- `plain_text` - The plain text version of the campaign
- `archive_html` - The archived HTML version of the campaign
- `variate_contents` - Content options for multivariate campaigns (if applicable)

## Prerequisites

Make sure you have configured your MailChimp API key and server prefix in the connector settings.