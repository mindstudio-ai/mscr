# Apollo People Search

This connector allows you to search for people in the Apollo database using various filters. You can use it to find prospects based on job titles, locations, company information, and more.

## Basic Configuration

### Search Criteria
- **Job Titles**: Enter job titles separated by commas (e.g., "marketing manager, sales representative")
- **Include Similar Titles**: Choose whether to include people with similar job titles
- **Keywords**: Enter keywords to filter results (e.g., "blockchain, AI")
- **Person Locations**: Enter locations where people live, separated by commas (e.g., "california, chicago, ireland")
- **Seniority Levels**: Enter seniority levels separated by commas. Available options: owner, founder, c_suite, partner, vp, head, director, manager, senior, entry, intern

### Company Filters
- **Company Locations**: Enter locations of company headquarters, separated by commas
- **Company Domains**: Enter domain names without "www" (e.g., "apollo.io, microsoft.com")
- **Email Status**: Enter email statuses separated by commas. Available options: verified, unverified, likely to engage, unavailable
- **Company Size**: Enter minimum and maximum employee counts to filter by company size
- **Revenue**: Enter minimum and maximum revenue values (numeric only, no symbols)

### Technology Filters
- **Using All Technologies**: Enter technologies that companies must be using, separated by commas
- **Using Any Technologies**: Enter technologies where companies must be using at least one, separated by commas
- **Not Using Technologies**: Enter technologies to exclude companies that use them, separated by commas

### Pagination
- **Page Number**: The page of results to retrieve (default: 1)
- **Results Per Page**: Number of results per page (default: 25, max: 100)

## Output
The connector returns search results including contact information for people matching your criteria.

## Notes
- This connector consumes credits from your Apollo account
- The API has a display limit of 50,000 records (100 records per page, up to 500 pages)
- Add more filters to narrow your search results for better performance
- This endpoint does not return new email addresses or phone numbers