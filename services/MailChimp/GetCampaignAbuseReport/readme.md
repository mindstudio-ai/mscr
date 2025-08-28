# Get Campaign Abuse Report

This connector retrieves information about a specific abuse report for a campaign in MailChimp.

## Prerequisites
- You need a MailChimp account with API access
- Your MailChimp API key must be configured in the environment variables
- Your MailChimp server prefix must be configured in the environment variables

## Configuration

### Campaign Information
- **Campaign ID**: Enter the unique identifier for the campaign. This can be found in the URL when viewing a campaign in MailChimp or via the MailChimp API.
- **Report ID**: Enter the ID for the specific abuse report you want to retrieve.

### Optional Parameters
- **Fields to Include**: A comma-separated list of fields you want to include in the response. Leave blank to include all fields.
  - Example: `id,email_address,date,merge_fields`
  
- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response.
  - Example: `_links,vip`

### Output
- **Output Variable**: The name of the variable where the abuse report data will be stored for use in subsequent steps.

## Response Data

The connector returns detailed information about the abuse report, including:

- Report ID
- Campaign ID
- List ID
- Email address information
- Date the abuse was reported
- Merge fields data (if available)
- VIP status
- Related links

## Example Use Cases

- Monitor and analyze abuse reports for your email campaigns
- Automatically update subscriber status based on abuse reports
- Generate reports on email campaign performance and compliance