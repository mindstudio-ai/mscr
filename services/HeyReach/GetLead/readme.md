# Get Lead Details

This action retrieves detailed information about a LinkedIn lead based on their profile URL using the HeyReach API.

## Configuration

### LinkedIn Profile URL
Enter the full LinkedIn profile URL of the lead you want to retrieve information for. The URL should be in the format:
```
https://www.linkedin.com/in/username/
```

For example:
- https://www.linkedin.com/in/john-doe/
- https://www.linkedin.com/in/jane-smith-123456789/

### Output Variable
Specify a name for the variable that will store the lead information. This variable will contain all the details returned by the API, including:

- Profile information (name, location, headline)
- Company information
- Position
- Email address (if available through enrichment)
- Profile image URL
- And other LinkedIn profile data

## Example Response

```json
{
  "linkedin_id": "63456789",
  "imageUrl": "https://media.licdn.com/dms/image/v2/some_url",
  "firstName": "John",
  "lastName": "Doe",
  "fullName": "John Doe",
  "location": "Texas",
  "summary": "",
  "companyName": "Marines",
  "companyUrl": "https://www.linkedin.com/company/marines",
  "position": "Director of Marines",
  "industry": null,
  "about": null,
  "username": "john_doe",
  "emailAddress": null,
  "connections": 0,
  "followers": 0,
  "experiences": "[]",
  "education": "[]",
  "profileUrl": "https://www.linkedin.com/in/john_doe",
  "enrichedEmailAddress": "john_doe@example.com",
  "headline": null,
  "emailEnrichments": [
    "john_doe@example.com"
  ]
}
```

## Notes

- The API requires a valid LinkedIn profile URL to retrieve lead information.
- Some fields may be null or empty if the information is not available on the lead's profile.
- Email addresses are provided through HeyReach's enrichment process and may not always be available.