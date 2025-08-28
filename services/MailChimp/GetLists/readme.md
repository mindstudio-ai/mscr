# Get Lists

This action retrieves information about all audiences (lists) in your MailChimp account.

## Configuration

### Filtering Options

- **Count**: The number of records to return. Default is 10, maximum is 1000.
- **Filter by Email**: Optionally restrict results to lists that include a specific subscriber's email address.
- **Sort By**: Choose to sort results by date created or leave blank for default sorting.
- **Sort Direction**: Choose between ascending (ASC) or descending (DESC) order.

### Output Options

- **Include Total Contacts**: Set to "Yes" to include the total_contacts field in the response, which contains an approximate count of all contacts in any state (subscribed, unsubscribed, cleaned, etc.).
- **Output Variable**: The variable name where the results will be stored.

## Output

The output will be stored in your specified variable and will contain:

- `lists`: An array of audience objects with details like ID, name, stats, etc.
- `total_items`: The total number of audiences in your account

## Example Output

```json
{
  "lists": [
    {
      "id": "abc123def",
      "web_id": 123456,
      "name": "My Newsletter",
      "contact": {
        "company": "Your Company",
        "address1": "123 Main St",
        "city": "Anytown",
        "state": "CA",
        "zip": "12345",
        "country": "US"
      },
      "permission_reminder": "You're receiving this email because you signed up for updates.",
      "stats": {
        "member_count": 1250,
        "total_contacts": 1500,
        "unsubscribe_count": 150,
        "campaign_count": 25
      }
    }
  ],
  "total_items": 1
}
```