# List Deals from ActiveCampaign

This connector retrieves a list of deals from your ActiveCampaign account with optional filtering and sorting capabilities.

## Prerequisites

- You need an ActiveCampaign account with API access
- Your API Key and Account URL must be configured in the service settings

## Basic Configuration

- **Search Term**: Optionally enter text to search for across deals
- **Filter By**: Choose which field to search in when using the search term

## Advanced Filtering Options

Expand the "Filtering" section to access additional filtering options:

- **Deal Status**: Filter by deal status (Open, Won, Lost)
- **Pipeline ID**: Filter deals by specific pipeline
- **Stage ID**: Filter deals by specific stage within a pipeline
- **Owner ID**: Filter deals by owner
- **Created After/Before**: Filter by creation date (format: YYYY-MM-DD)
- **Minimum/Maximum Value**: Filter by deal value in USD

## Sorting & Pagination

Expand the "Sorting & Pagination" section to control how results are returned:

- **Sort By**: Choose a field to sort results by
- **Sort Direction**: Sort in ascending or descending order
- **Limit**: Maximum number of deals to return (default: 20)
- **Offset**: Number of deals to skip (useful for pagination)

## Output

The connector will store the list of deals in the specified output variable. The result will be an array of deal objects containing details like ID, title, value, status, stage, owner, created date, and more.

## Example Usage

1. Set basic search parameters if needed
2. Configure any advanced filters to narrow down results
3. Set sorting and pagination options
4. Specify an output variable name (e.g., "deals")
5. Use the output variable in subsequent actions by referencing `{{deals}}`