# Create Deal in Apollo

This connector creates a new deal in your Apollo.io account.

## Prerequisites

- You must have an Apollo.io account with a **master API key**. Regular API keys will not work with this endpoint.
- Your API key should be configured in the Apollo service connection settings.

## Configuration

### Deal Information

- **Deal Name**: (Required) Provide a descriptive name for your deal (e.g., "Enterprise SaaS Expansion Deal")
- **Deal Amount**: The monetary value of the deal. Enter numbers only without commas or currency symbols (e.g., `50000` for $50,000)
- **Account ID**: The Apollo ID of the company associated with this deal. You can find this ID by searching for the organization in Apollo or using the Organization Search API endpoint.

### Deal Details

- **Owner ID**: The Apollo ID of the team member who will own this deal. You can find user IDs using the "Get a List of Users" API endpoint.
- **Deal Stage ID**: The ID of the deal stage in your Apollo account. You can find stage IDs using the "List Deal Stages" API endpoint.
- **Estimated Close Date**: The projected date when the deal is expected to close, in YYYY-MM-DD format (e.g., `2024-12-31`).

### Output

- **Output Variable**: Name of the variable that will store the created deal information. This will contain the full deal object including the generated deal ID.

## Example Response

The output variable will contain a JSON object with details about the created deal:

```json
{
  "opportunity": {
    "id": "66e09ea8e3cfcf01b2208ec7",
    "team_id": "6095a710bd01d100a506d4ac",
    "owner_id": "66302798d03b9601c7934ebf",
    "amount": 99999999,
    "account_id": "55e16cfbf3e5bb66cf0026f3",
    "name": "Massive Space Deal",
    "opportunity_stage_id": "6095a710bd01d100a506d4bd",
    "created_at": "2024-09-10T19:31:52.436Z",
    // Additional deal properties...
  }
}
```

## Notes

- This connector requires a master API key. If you receive a 403 error, check that your API key has sufficient permissions.
- The currency for the deal amount is determined by your Apollo account settings.