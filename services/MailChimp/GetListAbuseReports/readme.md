# Get List Abuse Reports

This connector retrieves all abuse reports for a specific MailChimp list. An abuse report is created when a recipient clicks "report spam" in their email program.

## Prerequisites

- You need a MailChimp account with API access
- You need your MailChimp API key (configured in the service settings)
- You need your MailChimp server prefix, e.g., "us19" (configured in the service settings)
- You need the ID of the list you want to check for abuse reports

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under Audience settings or in the URL when viewing a list.
  - Example: `a1b2c3d4e5`

### Pagination Options

- **Count**: The number of abuse reports to return per request (maximum 1000, default is 10)
- **Offset**: The number of records to skip (useful for pagination when retrieving large sets of data)

### Field Selection

- **Fields to Include**: Optionally specify which fields you want to include in the response. This helps reduce response size if you only need specific data.
  - Example: `abuse_reports.email_address,abuse_reports.date,total_items`

- **Fields to Exclude**: Optionally specify which fields you want to exclude from the response.
  - Example: `_links,abuse_reports._links`

### Output

- **Output Variable**: Name of the variable where the abuse reports data will be stored for use in subsequent steps of your workflow.

## Response Structure

The output will contain:

- `abuse_reports`: An array of abuse report objects with details like:
  - `email_address`: The subscriber's email address
  - `date`: When the abuse was reported
  - `campaign_id`: The campaign that was reported as spam
- `list_id`: The ID of the list you queried
- `total_items`: The total number of abuse reports for this list

## Example Usage

After retrieving the abuse reports, you might want to:
- Send notifications about new abuse reports
- Update your subscriber management practices
- Create a report of abuse trends