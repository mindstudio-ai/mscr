# Search Contacts in Apollo

This connector allows you to search for contacts in your Apollo.io account using various search parameters.

## How to use this connector

### Search Parameters

- **Keywords**: Enter search terms to narrow your results. You can include names, job titles, companies, or email addresses. 
  - Example: `john smith; marketing director; google`
  - Separate different search concepts with semicolons

- **Contact Stage IDs**: If you want to filter by specific contact stages, enter the IDs as a comma-separated list.
  - Example: `6095a710bd01d100a506d4ae,6095a710bd01d100a506d4af`
  - Leave blank to search all stages
  - You can find stage IDs in Apollo by calling the List Contact Stages endpoint

- **Sort By**: Choose how to sort your search results:
  - Most Recent Activity: Sorts by the most recent activity date
  - Last Email Opened: Sorts by when contacts last opened an email
  - Last Email Clicked: Sorts by when contacts last clicked an email link
  - Creation Date: Sorts by when contacts were created
  - Last Updated: Sorts by when contacts were last updated
  - Default: Uses Apollo's default sorting

- **Sort Order**: Choose between:
  - Descending (newest first): Shows the most recent items first
  - Ascending (oldest first): Shows the oldest items first

### Pagination

- **Results Per Page**: Number of contacts to return per page (maximum 100)
- **Page Number**: The page of results to retrieve (starts at 1)

### Output

- **Output Variable**: Name of the variable where search results will be stored

## Response Format

The connector returns the complete Apollo API response, which includes:

- `contacts`: Array of contact objects with details like name, email, company, etc.
- `pagination`: Information about total results and pages
- Other metadata returned by the API

## Limitations

- This endpoint has a display limit of 50,000 records (100 records per page, up to 500 pages)
- This feature is not accessible to Apollo users on free plans