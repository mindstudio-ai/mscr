# Update Deal in Apollo

This connector allows you to update an existing deal in your Apollo account.

## Prerequisites

- You need a **master API key** from Apollo. Regular API keys won't work with this endpoint.
- You need the Deal ID of the deal you want to update.

## Configuration

### Deal Information

- **Deal ID**: The unique identifier for the deal you want to update. You can find this in Apollo or by using the List All Deals endpoint.
- **Deal Name**: The new name for the deal.
- **Deal Amount**: The monetary value of the deal. Enter only numbers without commas or currency symbols (e.g., `10000` for $10,000).

### Deal Status

- **Deal Stage ID**: The ID of the new stage for the deal. You can find stage IDs using the List Deal Stages endpoint.
- **Close Date**: The estimated close date for the deal in YYYY-MM-DD format (e.g., `2024-12-31`).
- **Mark as Closed**: Select "Yes" to mark the deal as closed.
- **Mark as Won**: Select "Yes" to mark the deal as won. This is typically used together with "Mark as Closed".

### Additional Details

- **Owner ID**: The ID of the user who will own the deal. You can find user IDs with the Get a List of Users endpoint.
- **Account ID**: The ID of the company associated with the deal. You can find account IDs with the Organization Search endpoint.
- **Deal Source**: The source of the deal (e.g., "Conference", "Referral").

### Output

- **Output Variable**: The name of the variable where the updated deal information will be stored. This will contain the complete deal object returned by Apollo.

## Example Response

The output variable will contain a JSON object with the updated deal information, similar to:

```json
{
  "opportunity": {
    "id": "66e09ea8e3cfcf01b2208ec7",
    "team_id": "6095a710bd01d100a506d4ac",
    "owner_id": "66302798d03b9601c7934ebf",
    "amount": 10000,
    "closed_date": "2024-12-31T00:00:00.000+00:00",
    "account_id": "60afffecbff6de00a4b82be7",
    "is_closed": false,
    "is_won": false,
    "name": "Enterprise Deal Q4",
    "opportunity_stage_id": "6095a710bd01d100a506d4bd",
    "source": "Conference",
    "created_at": "2024-09-10T19:31:52.436Z"
    // Additional fields will be included
  }
}
```

## Notes

- You only need to include the fields you want to update. Leave other fields blank.
- The API requires a master API key. If you receive a 403 error, check that you're using a master key.