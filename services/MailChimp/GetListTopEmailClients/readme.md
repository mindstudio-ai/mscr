# Get List Top Email Clients

This connector retrieves a list of the top email clients based on user-agent strings for a specific MailChimp list (audience).

## Prerequisites

- You need a MailChimp account with an API key
- You need to know your MailChimp server prefix (e.g., "us19")
- You need at least one list (audience) in your MailChimp account

## Configuration

### List Configuration

- **List ID**: Enter the unique identifier for the MailChimp list (audience) you want to analyze. You can find this ID in your MailChimp account by navigating to Audience > All Contacts > Settings > Audience name and defaults.

### Optional Parameters

- **Fields to Include**: Optionally specify which fields to include in the response as a comma-separated list. For example: `clients,list_id,total_items`

- **Fields to Exclude**: Optionally specify which fields to exclude from the response as a comma-separated list. For example: `_links`

### Output

- **Output Variable**: Specify a name for the variable that will store the results. This variable will contain an object with information about the top email clients used by subscribers in your list.

## Example Output

```json
{
  "clients": [
    {
      "client": "Gmail",
      "members": 42
    },
    {
      "client": "Apple Mail",
      "members": 27
    },
    {
      "client": "Outlook",
      "members": 15
    }
  ],
  "list_id": "abc123def",
  "total_items": 3
}
```

## Notes

- This connector is useful for understanding which email clients your subscribers use most frequently, which can help you optimize your email designs.
- The response will show email clients in descending order based on usage.