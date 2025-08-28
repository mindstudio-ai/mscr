# Get Campaign Link Details

This connector retrieves detailed click information for a specific link within a MailChimp campaign.

## Prerequisites

- You need a MailChimp account with API access
- You need to have created at least one campaign with links that have been clicked
- You need to know both the Campaign ID and Link ID you want to analyze

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for your campaign. You can find this in the URL when viewing a campaign in MailChimp or via the API.
- **Link ID**: Enter the unique identifier for the specific link you want to analyze. You can find link IDs by first getting a list of all links in a campaign.

### Advanced Options

- **Fields to Include** (Optional): A comma-separated list of specific fields you want to include in the response. For example: `id,url,total_clicks,unique_clicks`
- **Fields to Exclude** (Optional): A comma-separated list of fields you want to exclude from the response. For example: `_links,ab_split`

### Output

- **Output Variable**: Name of the variable that will store the link details. This variable will contain information such as total clicks, unique clicks, click percentages, and more.

## Example Response

The output will contain data similar to:

```json
{
  "id": "abc123",
  "url": "https://example.com",
  "total_clicks": 42,
  "click_percentage": 12.5,
  "unique_clicks": 30,
  "unique_click_percentage": 8.9,
  "last_click": "2023-09-15T14:30:00Z",
  "campaign_id": "def456"
}
```