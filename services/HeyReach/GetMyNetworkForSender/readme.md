# Get My Network For Sender

This connector retrieves a paginated list of LinkedIn connections in a sender's network from HeyReach.

## Configuration

### Request Parameters

- **Sender ID**: Enter the numeric ID of the sender account for which you want to retrieve the network connections. For example: `1234`.

- **Page Number**: The page number to retrieve, starting from 0. For the first page, use `0`.

- **Page Size**: Number of records to return per page. Maximum value is 100.

### Output

- **Output Variable**: Name of the variable where the results will be stored. This variable will contain the full response with connection details.

## Response Structure

The output variable will contain a JSON object with:

- `totalCount`: Total number of connections
- `items`: Array of connection objects with profile details

Each connection in the `items` array includes:

```json
{
  "linkedin_id": "string",
  "profileUrl": "https://www.linkedin.com/in/username",
  "firstName": "John",
  "lastName": "Doe",
  "headline": "Software Engineer at Company",
  "imageUrl": "https://media.licdn.com/dms/image/...",
  "location": "New York, NY",
  "companyName": "Company Name",
  "companyUrl": "https://www.linkedin.com/company/...",
  "position": "Software Engineer",
  "about": "About section content...",
  "connections": 500,
  "followers": 1000,
  "emailAddress": "john.doe@example.com"
}
```

## Prerequisites

Make sure you have set up your HeyReach API key in the connector settings.