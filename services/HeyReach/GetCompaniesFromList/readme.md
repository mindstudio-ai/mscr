# Get Companies From List

This connector retrieves companies from a HeyReach list with pagination and filtering options.

## Configuration

### List ID (Required)
Enter the numeric ID of the HeyReach list from which you want to retrieve companies. You can find your list IDs in the HeyReach dashboard under Lists.

Example: `123`

### Offset (Optional)
The starting position for pagination (0-based). Use this to retrieve companies beyond the first page of results.

Default: `0`

### Keyword (Optional)
Filter companies by a specific search term. This will return only companies that match the keyword.

Example: `HeyReach`

### Limit (Optional)
The maximum number of companies to return in a single request. You can retrieve up to 1000 companies per request.

Default: `100`

### Output Variable (Required)
Name of the variable that will store the retrieved companies data. This variable will contain an object with:
- `totalCount`: The total number of companies matching your criteria
- `items`: An array of company objects with details like name, description, industry, etc.

## Example Response

```json
{
  "totalCount": 42,
  "items": [
    {
      "name": "HeyReach",
      "description": "LinkedIn automation tool for agencies and sales teams",
      "industry": "Software",
      "imageUrl": "https://example.com/logo.png",
      "companySize": "11-50 employees",
      "employeesOnLinkedIn": 25,
      "location": "San Francisco, CA",
      "specialities": "LinkedIn Automation, Sales Outreach",
      "website": "https://heyreach.io"
    },
    // More companies...
  ]
}
```

## Notes
- Ensure your HeyReach API key is properly configured in your service settings
- If you receive a 429 error, you've exceeded the rate limits and should try again later
- For large lists, use the offset parameter to paginate through all results