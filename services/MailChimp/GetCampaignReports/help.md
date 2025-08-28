# Get Campaign Reports

This action retrieves campaign reports from your Mailchimp account, providing detailed analytics about your email campaigns.

## Configuration

### Report Filters

- **Campaign Type**: Select a specific campaign type to filter your reports. Leave as "All Types" to retrieve reports for all campaign types.

- **Since Send Time**: Optional date filter to show only campaigns sent after this date. Must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SS+00:00).
  Example: `2023-01-01T00:00:00+00:00`

- **Before Send Time**: Optional date filter to show only campaigns sent before this date. Must be in ISO 8601 format (YYYY-MM-DDTHH:MM:SS+00:00).
  Example: `2023-12-31T23:59:59+00:00`

### Pagination

- **Number of Reports**: Specify how many campaign reports to return (maximum 1000). Default is 10.

- **Offset**: Number of records to skip for pagination. Use this with "Number of Reports" to page through large result sets.

### Output

- **Output Variable**: Name of the variable where the campaign reports will be stored. This variable will contain an object with:
  - `reports`: Array of campaign report objects
  - `total_items`: Total number of items matching your query
  - `_links`: Navigation links for pagination

## Example Output

The output will include detailed information about each campaign, such as:
- Open and click rates
- Bounce statistics
- Subscriber activity
- Campaign performance metrics
- Comparison to industry benchmarks