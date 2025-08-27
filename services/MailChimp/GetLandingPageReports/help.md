# Get Landing Page Reports

This connector retrieves analytics reports for your Mailchimp landing pages, including metrics like visits, unique visits, subscribes, clicks, and conversion rates.

## Prerequisites

- A Mailchimp account
- API key and server prefix configured in your MindStudio environment

## Configuration

### Query Parameters

- **Number of Records**: The number of landing page reports to return. Default is 10, maximum is 1000.
- **Offset**: Number of records to skip for pagination. Default is 0.
- **Fields to Include**: Optional comma-separated list of specific fields to include in the response. Leave empty to return all fields.
  - Example: `landing_pages.id,landing_pages.name,landing_pages.visits`
- **Fields to Exclude**: Optional comma-separated list of fields to exclude from the response.
  - Example: `landing_pages._links,_links`

### Output

- **Output Variable**: Name of the variable where the landing page reports data will be stored.

## Response Format

The output will be a JSON object containing:

```json
{
  "landing_pages": [
    {
      "id": "00dfc2e1f0",
      "name": "My Landing Page",
      "title": "Welcome to my landing page",
      "url": "https://mailchi.mp/...",
      "visits": 120,
      "unique_visits": 85,
      "subscribes": 45,
      "clicks": 30,
      "conversion_rate": 37.5
      // Additional fields...
    }
    // More landing pages...
  ],
  "total_items": 5
}
```

## Example Usage

After configuring this connector, you can use the output variable in subsequent actions to process or display the landing page analytics data.