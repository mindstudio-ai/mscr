# Get List Members

This connector retrieves members from a specific MailChimp list with filtering and pagination options.

## Prerequisites

- You need a MailChimp account with API access
- You need your MailChimp API key and server prefix configured in the service settings
- You need the ID of the list you want to retrieve members from

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under the list settings.
  - Example: `a1b2c3d4e5`

- **Status Filter**: (Optional) Filter subscribers by their current status in the list.
  - Choose from: All, Subscribed, Unsubscribed, Cleaned, Pending, Transactional, or Archived

- **Count**: (Optional) The number of members to return in a single request.
  - Default: 10
  - Maximum: 1000

### Additional Options

- **Offset**: (Optional) Number of records to skip for pagination. Use this with Count to paginate through large lists.
  - Example: To get the second page of 100 results, set Count to 100 and Offset to 100

- **VIP Only**: (Optional) Filter to return only VIP members from your list.

- **Sort By**: (Optional) Choose a field to sort the results by.
  - Options: Opt-in Time, Signup Time, or Last Changed

- **Sort Direction**: (Optional) Choose whether to sort in ascending (A-Z, oldest-newest) or descending (Z-A, newest-oldest) order.

### Output

- **Output Variable**: Name of the variable that will store the list members data.
  - The output will contain an array of member objects with details like email address, status, merge fields, etc.

## Example Output

The output will be a JSON object with the following structure:

```json
{
  "members": [
    {
      "id": "abc123def456",
      "email_address": "example@email.com",
      "status": "subscribed",
      "merge_fields": {
        "FNAME": "John",
        "LNAME": "Doe"
      },
      "tags": [
        {
          "id": 123,
          "name": "Customer"
        }
      ],
      "...": "other member properties"
    },
    "...more members"
  ],
  "total_items": 250,
  "list_id": "a1b2c3d4e5"
}
```