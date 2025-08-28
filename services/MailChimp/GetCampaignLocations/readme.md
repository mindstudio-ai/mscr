# Get Campaign Locations

This action retrieves the top open locations for a specific MailChimp campaign, showing you where your subscribers are opening your emails.

## Configuration

### Campaign Information

- **Campaign ID**: Enter the unique identifier for your MailChimp campaign. This can be found in the URL when viewing a campaign in MailChimp or through the MailChimp API.
  - Example: `abc123def`

### Optional Parameters

- **Number of Results**: The number of location records to return (maximum 1000). Default is 10.
- **Offset**: Number of records to skip for pagination. Use this with the Number of Results parameter to page through large result sets. Default is 0.
- **Fields to Include**: A comma-separated list of specific fields you want to include in the response. Leave empty to return all fields.
  - Example: `locations.country_code,locations.region_name,total_items`
- **Fields to Exclude**: A comma-separated list of fields you want to exclude from the response.
  - Example: `_links`

### Output

- **Output Variable**: The name of the variable that will store the campaign location data. This data will be available to use in subsequent actions.

## Response Format

The response will include:

```json
{
  "locations": [
    {
      "country_code": "US",
      "region": "NY",
      "region_name": "New York",
      "opens": 42,
      "proxy_excluded_opens": 40
    },
    // More locations...
  ],
  "campaign_id": "abc123def",
  "total_items": 25,
  "_links": [
    // Pagination links...
  ]
}
```

## Notes

- You need to have a valid MailChimp API key and server prefix configured in your connection settings.
- This action only works with campaigns that have been sent and have open data available.