# List Routing Forms

This connector retrieves a list of routing forms from your Calendly account. Routing forms allow you to direct users to specific event types based on their responses to questions.

## Configuration

### Query Parameters

- **Count**: Specify how many routing forms to return per page (1-100). Default is 10.
- **Page Token**: Used for pagination. Leave blank for the first page, then use the token returned in the response to get subsequent pages.
- **Sort By**: Choose how to sort the results:
  - Created (newest/oldest first)
  - Updated (newest/oldest first)
  - Name (alphabetically ascending/descending)

### Output

- **Output Variable**: The name of the variable where the results will be stored. This variable will contain the full response including:
  - `collection`: Array of routing form objects
  - `pagination`: Object with pagination details including `next_page_token` if available

## Example Response

```json
{
  "collection": [
    {
      "uri": "https://api.calendly.com/routing_forms/FORM123",
      "name": "Customer Intake Form",
      "status": "active",
      "created_at": "2023-01-15T14:30:00.000000Z",
      "updated_at": "2023-02-01T09:15:00.000000Z"
    },
    {
      "uri": "https://api.calendly.com/routing_forms/FORM456",
      "name": "Support Request Form",
      "status": "active", 
      "created_at": "2023-03-10T11:20:00.000000Z",
      "updated_at": "2023-03-15T16:45:00.000000Z"
    }
  ],
  "pagination": {
    "count": 2,
    "next_page": null,
    "next_page_token": null,
    "previous_page": null,
    "previous_page_token": null
  }
}
```

## Notes

- This connector requires authentication with your Calendly account.
- To view more details about a specific routing form, you can use the URI provided in the response.