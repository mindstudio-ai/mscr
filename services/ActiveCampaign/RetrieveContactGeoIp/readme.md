# Retrieve Contact's Geo IP Address

This action retrieves geographic location information for a contact based on their IP address in ActiveCampaign.

## What You'll Need

- Your ActiveCampaign API Key (configured in the service settings)
- Your ActiveCampaign Base Account URL (configured in the service settings)
- The Geo Address ID of the contact

## How to Find a Contact's Geo Address ID

Before using this action, you need to know the Geo Address ID for the contact. To find this:

1. First, get the contact's ID from ActiveCampaign
2. Make a GET request to `/contacts/{contactId}/geoIps` using another action or directly in the ActiveCampaign interface
3. This will return a list of geo IPs for that contact, including their IDs

## Configuration

### Geo Address ID
Enter the ID of the geo address you want to retrieve. This is a numeric value.

### Output Variable
Enter a name for the variable that will store the geo IP information. This variable will contain an object with the following properties:

- `ip4`: IP address
- `country2`: Country code (e.g., "US")
- `country`: Full country name (e.g., "United States")
- `state`: State name
- `city`: City name
- `zip`: Zip/Postal code
- `area`: Area code
- `lat`: Latitude coordinates
- `lon`: Longitude coordinates
- `tz`: Timezone (e.g., "America/Chicago")
- `tstamp`: Timestamp of when the data was collected
- `id`: Geo address ID

## Note

The geo IP data is collected when a contact fills out any ActiveCampaign form. The location data is approximate and based on IP address geolocation databases, not the exact location of the contact.