# Get Campaign Sub-Reports

This action retrieves a list of reports with child campaigns for a specific parent campaign in Mailchimp.

## When to use this action

Use this action when you want to:
- Get performance data for child campaigns under a parent campaign
- Analyze the results of an A/B split test
- Compare metrics across multiple related campaigns
- Generate reports for campaign series

## Required inputs

- **Campaign ID**: The unique identifier for the parent campaign. You can find this in the URL when viewing a campaign in Mailchimp or via the Mailchimp API.

## Optional inputs

- **Fields to Include**: A comma-separated list of specific fields you want to include in the response. This helps reduce the response size if you only need certain data points.
  Example: `id,campaign_title,emails_sent,opens.opens_total,clicks.clicks_total`

- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response.
  Example: `_links,timeseries,timewarp`

## Output

The action returns comprehensive data about the child campaigns, including:
- Campaign IDs and titles
- Email statistics (sent, opened, clicked)
- Engagement metrics (opens, clicks, bounces)
- Performance data (open rates, click rates)
- A/B testing results (if applicable)

The output is stored in the variable you specify in the "Output Variable" field.

## Example use cases

- Compare performance of different campaign variations in an A/B test
- Generate reports showing how a series of related campaigns performed
- Analyze which child campaign had the best engagement metrics
- Track delivery status across multiple related campaigns