# Get List Locations

This connector retrieves the geographical distribution of your Mailchimp list's subscribers based on their IP addresses.

## What You'll Need

- Your Mailchimp API Key (configured in the service settings)
- Your Mailchimp Server Prefix (configured in the service settings)
- The ID of the Mailchimp list/audience you want to analyze

## Configuration

### List Information

- **List ID**: Enter the unique identifier for your Mailchimp list/audience. You can find this in your Mailchimp account by going to Audience → Settings → Audience name and defaults.
  - Example: `a1b2c3d4e5`

### Response Options (Optional)

- **Fields to Include**: Specify which fields you want to include in the response. This helps reduce response size if you only need specific data.
  - Example: `locations.country,locations.total,locations.cc`

- **Fields to Exclude**: Specify which fields you want to exclude from the response.
  - Example: `_links,locations.percent`

### Output

- **Output Variable**: The name of the variable where the results will be stored. You can reference this variable in subsequent steps of your workflow.

## Output Format

The connector returns data in this format:

```json
{
  "locations": [
    {
      "country": "United States",
      "cc": "US",
      "percent": 42.5,
      "total": 85
    },
    {
      "country": "United Kingdom",
      "cc": "GB",
      "percent": 23.5,
      "total": 47
    }
    // Additional countries...
  ],
  "list_id": "a1b2c3d4e5",
  "total_items": 10
}
```

## Common Use Cases

- Analyze your subscriber geographic distribution
- Create targeted campaigns based on subscriber location
- Generate reports on audience demographics