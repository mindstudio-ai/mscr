# Get Publication

This connector retrieves detailed information about a specific Beehiiv publication.

## Configuration

### Publication ID
Enter the unique identifier of the publication you want to retrieve information about. This ID follows the format `pub_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.

Example:
```
pub_ad76629e-4a39-43ad-8055-0ee89dc6db15
```

### Include Statistics
Select what statistics you want to include in the response:
- **None**: No statistics will be included
- **All Stats**: Include all available statistics
- **Active Subscriptions Only**: Only include total active subscription count
- **Premium Subscriptions Only**: Only include premium subscription count
- **Free Subscriptions Only**: Only include free subscription count
- **Average Open Rate Only**: Only include the publication's average open rate
- **Average Click Rate Only**: Only include the publication's average click rate
- **Total Sent Only**: Only include the total number of emails sent
- **Total Opened Only**: Only include the total number of uniquely opened emails
- **Total Clicked Only**: Only include the total number of clicks from emails

### Output Variable
Enter a name for the variable that will store the publication data. You can reference this variable in subsequent steps of your workflow.

## Response Data

The connector returns a JSON object containing:
- `id`: The publication's unique identifier
- `name`: The name of the publication
- `organization_name`: The name of the organization
- `referral_program_enabled`: Whether the referral program is enabled
- `created`: Timestamp when the publication was created
- `stats`: Statistics about the publication (if requested)

Example response:
```json
{
  "id": "pub_ad76629e-4a39-43ad-8055-0ee89dc6db15",
  "name": "Bee Informed",
  "organization_name": "Barry's Hiiv",
  "referral_program_enabled": true,
  "created": 1715698529,
  "stats": {
    "active_subscriptions": 12,
    "active_premium_subscriptions": 2,
    "active_free_subscriptions": 10,
    "average_open_rate": 0.8,
    "average_click_rate": 0.45,
    "total_sent": 12,
    "total_unique_opened": 9,
    "total_clicked": 6
  }
}
```