# Search Outreach Emails

This connector allows you to search for emails that have been sent as part of Apollo sequences. You can filter emails based on various criteria such as status, reply type, date range, and more.

## Requirements

- You must have an Apollo account with access to sequences
- Your Apollo API key must be a **master API key** (this endpoint will return a 403 error with a regular API key)
- This feature is not accessible to Apollo users on free plans

## Basic Search Parameters

- **Email Status**: Filter emails by their current status (delivered, opened, bounced, etc.)
- **Reply Classes**: Filter by the type of response received from recipients
- **Keywords**: Search for specific content within emails (e.g., "demo", "meeting", "follow up")
- **Results Per Page**: Number of results to return per page (maximum 100)
- **Page Number**: Page number to retrieve (useful for paginating through large result sets)

## Date Range Filters

- **Date Range Mode**: Choose whether to filter by when emails were scheduled (`due_at`) or when they were delivered (`completed_at`)
- **Start Date**: Beginning of the date range in YYYY-MM-DD format (e.g., "2023-01-01")
- **End Date**: End of the date range in YYYY-MM-DD format (e.g., "2023-12-31")

## Advanced Filters

- **Sequence IDs**: Comma-separated list of sequence IDs to include in the search
  - Example: `66e9e215ece19801b219997f,66e9e215ece19801b219998f`
- **Exclude Sequence IDs**: Comma-separated list of sequence IDs to exclude from the search
- **User IDs**: Comma-separated list of Apollo user IDs to filter by (only show emails sent by these users)
- **Not Sent Reasons**: Filter by reasons emails weren't sent (useful for troubleshooting)

## Output

The connector will return the complete search results from Apollo, including details about each email such as:
- Email ID
- Status
- Recipient information
- Scheduled and delivery dates
- Sequence information
- Tracking data (opens, clicks, etc.)

## Limitations

- This endpoint has a display limit of 50,000 records (100 records per page, up to 500 pages)
- Add more filters to narrow your search results if you need to access more data