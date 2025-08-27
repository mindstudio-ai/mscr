# View Deal

This connector retrieves complete details about a deal within your Apollo account.

## Prerequisites

- You must have a **master API key** from Apollo. Regular API keys will not work with this endpoint.
- You need to know the Deal ID of the deal you want to view.

## Configuration

### Deal Information

- **Deal ID**: Enter the unique identifier for the deal you want to view. 
  - Example: `66e09ea8e3cfcf01b2208ec7`
  - You can find deal IDs by using the "List All Deals" endpoint in Apollo or by checking the URL when viewing a deal in the Apollo web interface.

### Output

- **Output Variable**: Enter a name for the variable that will store the deal information. This variable will contain all details about the deal including:
  - Basic deal information (ID, name, amount)
  - Status information (is_closed, is_won)
  - Dates (created_at, closed_date)
  - Owner information
  - Stage information
  - And more

## Example Response

```json
{
  "id": "66e09ea8e3cfcf01b2208ec7",
  "team_id": "6095a710bd01d100a506d4ac",
  "owner_id": "66302798d03b9601c7934ebf",
  "amount": 99999999,
  "account_id": "60afffecbff6de00a4b82be7",
  "is_closed": false,
  "is_won": false,
  "name": "Massive Space Deal",
  "opportunity_stage_id": "6095a710bd01d100a506d4bd",
  "created_at": "2024-09-10T19:31:52.436Z",
  "forecast_category": "pipeline",
  "deal_probability": 10
  // Additional fields not shown for brevity
}
```

## Troubleshooting

- **403 Forbidden**: This usually means you're not using a master API key. Make sure you've created and are using a master API key.
- **404 Not Found**: The deal ID you provided doesn't exist or you don't have access to it.
- **429 Too Many Requests**: You've hit Apollo's rate limits. Wait before trying again.