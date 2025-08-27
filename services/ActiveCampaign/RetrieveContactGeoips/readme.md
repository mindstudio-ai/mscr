# Retrieve Contact Geo-IPs

This action retrieves geographic IP information for a specific contact in your ActiveCampaign account. This data shows the IP addresses from which a contact has interacted with your ActiveCampaign forms.

## When to use this action

Use this action when you want to:
- Track the geographic locations from which a contact has accessed your forms
- Analyze a contact's location history
- Get IP address data for compliance or security purposes

## Required inputs

### Contact ID
Enter the numeric ID of the contact in ActiveCampaign whose geo-IP information you want to retrieve.

Example: `299`

### Output Variable
Enter a name for the variable that will store the geo-IP results. You can reference this variable in later steps of your workflow.

## What this action returns

This action returns an array of geo-IP objects for the specified contact. Each object contains:

- `contact`: The contact ID
- `ip4`: The IP address (in numeric format)
- `tstamp`: Timestamp when the IP was recorded
- `id`: The unique ID of the geo-IP record
- `geoAddress`: ID reference to the geographic address information
- Additional metadata and links

Example output:
```json
{
  "geoIps": [
    {
      "contact": "299",
      "campaignid": "0",
      "messageid": "0",
      "geoaddrid": "1",
      "ip4": "1234567890",
      "tstamp": "2023-12-20T13:26:08-06:00",
      "links": {
        "geoAddress": "https://account.api-us1.com/api/3/geoIps/1/geoAddress"
      },
      "id": "1",
      "geoAddress": "1"
    }
  ]
}
```

## Note
The most recent geo-IP record will have the highest `geoAddress` value.