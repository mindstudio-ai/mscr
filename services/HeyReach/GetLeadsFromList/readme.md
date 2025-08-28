# Get Leads From List

This connector retrieves leads from a specified HeyReach list, allowing you to access LinkedIn profile data for leads in your HeyReach account.

## Configuration

### List Configuration

- **List ID**: Enter the numeric ID of the lead list you want to retrieve leads from. You can find this ID in your HeyReach dashboard when viewing a list.
- **Limit**: Maximum number of leads to return per request (up to 1000). Default is 100.
- **Offset**: Number of leads to skip for pagination. Use this with the Limit parameter to paginate through large lists. Default is 0.

### Filter Options

- **Search Keyword**: Optional search term to filter leads by name or other relevant fields.
- **LinkedIn Profile URL**: Filter to get a specific lead by their LinkedIn profile URL (e.g., `https://www.linkedin.com/in/john-doe/`).
- **LinkedIn ID**: Filter by LinkedIn ID. This ID can be found in responses from other HeyReach API endpoints.
- **Created From**: Filter leads created on or after this date (ISO 8601 format, e.g., `2023-01-01T00:00:00Z`).
- **Created To**: Filter leads created before or at this date (ISO 8601 format, e.g., `2023-12-31T23:59:59Z`).

### Output

- **Output Variable**: Name of the variable that will store the retrieved leads data.

## Response Structure

The connector returns data in the following structure:

```json
{
  "totalCount": 42,
  "items": [
    {
      "profileUrl": "https://www.linkedin.com/in/john-doe/",
      "firstName": "John",
      "lastName": "Doe",
      "headline": "Software Engineer at Example Corp",
      "imageUrl": "https://media.licdn.com/dms/image/...",
      "location": "San Francisco, CA",
      "companyName": "Example Corp",
      "companyUrl": "https://www.linkedin.com/company/example-corp/",
      "position": "Software Engineer",
      "about": "Experienced software engineer...",
      "connections": 500,
      "followers": 1200,
      "tags": ["Tech", "Engineering"],
      "emailAddress": "john.doe@example.com",
      "customFields": [
        {
          "name": "Industry",
          "value": "Technology"
        }
      ]
    }
    // Additional leads...
  ]
}
```

## Error Handling

The connector will display appropriate error messages for:
- Invalid parameters (400 Bad Request)
- Authentication issues (401 Unauthorized)
- List not found (404 Not Found)
- Rate limiting (429 Too Many Requests)