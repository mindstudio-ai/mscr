# Organization Search

This connector allows you to search for organizations in the Apollo database using various filters.

## Usage

Use this connector to find companies that match specific criteria such as:
- Company name
- Employee count
- Geographic location
- Revenue range
- Technologies used
- And more

## Configuration

### Basic Search Parameters

- **Organization Name**: Enter a company name or partial name to search for (e.g., "apollo" or "mining")
- **Employee Count Ranges**: Enter employee count ranges in the format "min,max" (e.g., "1,10" for 1-10 employees)
  - For multiple ranges, separate with semicolons (e.g., "1,10;250,500;1000,5000")
- **Locations**: Enter locations of company headquarters (cities, states, countries)
  - For multiple locations, separate with semicolons (e.g., "texas;tokyo;spain")
- **Excluded Locations**: Enter locations to exclude from your search
  - For multiple locations, separate with semicolons (e.g., "minnesota;ireland;seoul")

### Financial & Technology Filters

- **Minimum Revenue**: Enter the minimum annual revenue in dollars (numbers only, no commas or currency symbols)
- **Maximum Revenue**: Enter the maximum annual revenue in dollars (numbers only, no commas or currency symbols)
- **Technologies Used**: Enter technologies used by the organization
  - For multiple technologies, separate with semicolons (e.g., "salesforce;google_analytics;wordpress_org")
  - Use underscores (_) to replace spaces and periods in technology names
- **Keywords**: Enter keywords associated with companies
  - For multiple keywords, separate with semicolons (e.g., "mining;consulting;sales strategy")

### Pagination

- **Results Per Page**: Number of results to return per page (maximum 100)
- **Page Number**: Page number to retrieve (maximum 500)
- **Output Variable**: Name of the variable to store the search results

## Notes

- This connector consumes credits as part of your Apollo pricing plan
- This feature is not accessible to Apollo users on free plans
- The API has a display limit of 50,000 records (100 records per page, up to 500 pages)