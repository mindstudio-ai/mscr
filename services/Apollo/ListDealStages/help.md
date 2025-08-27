# List Deal Stages

This action retrieves all deal stages available in your Apollo account. Deal stages are used in the sales pipeline to track opportunities.

## Prerequisites

- You must have an Apollo account with API access
- You need a **master API key** for this endpoint (regular API keys won't work)
- To create a master API key, visit your Apollo account settings under the API Keys section

## Configuration

### Output Variable

Enter a variable name to store the list of deal stages. This will contain an array of deal stage objects that you can use in subsequent actions.

## Output Format

The output will be an array of deal stage objects, each containing:

```json
{
  "id": "6095a710bd01d100a506d4bd",
  "team_id": "6095a710bd01d100a506d4ac",
  "name": "Qualify",
  "display_order": 0,
  "forecast_category_cd": "Pipeline",
  "is_won": false,
  "is_closed": false,
  "probability": 10,
  "description": "Very first interaction with the AE...",
  "salesforce_id": "01Jbn00000QmeZmEAJ",
  "is_meeting_set": null,
  "opportunity_pipeline_id": "654b989fcb2a5200010a90db",
  "is_editable": null,
  "type": "Open"
}
```

## Common Uses

- Populate dropdown menus with available deal stages
- Get deal stage IDs for use in other Apollo actions like creating or updating deals
- Analyze your sales pipeline structure

## Notes

- This endpoint requires a master API key. If you use a regular API key, you'll receive a 403 error.
- The response includes all deal stages configured in your Apollo account.