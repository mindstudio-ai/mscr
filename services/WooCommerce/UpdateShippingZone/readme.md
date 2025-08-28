# Update Shipping Zone

This action updates the sort order of an existing shipping zone in your WooCommerce store.

## Prerequisites

- You need to have your WooCommerce store URL, API Consumer Key, and API Consumer Secret configured in the service settings.
- You need to know the ID of the shipping zone you want to update.

## Configuration

### Shipping Zone Details

- **Shipping Zone ID**: Enter the numeric ID of the shipping zone you want to update. You can find this in your WooCommerce admin dashboard under WooCommerce > Settings > Shipping > Shipping Zones, or by listing all shipping zones via the API.

- **Sort Order**: Enter a numeric value representing the new sort order for the shipping zone. Lower numbers will appear first in the list of shipping zones.

### Output

- **Output Variable**: Specify a name for the variable that will store the response from the WooCommerce API. This will contain the updated shipping zone details.

## Example Response

The output variable will contain a JSON object with the updated shipping zone details:

```json
{
  "id": 5,
  "name": "Brazil",
  "order": 1,
  "_links": {
    "self": [{ "href": "https://your-site.com/wp-json/wc/v3/shipping/zones/5" }],
    "collection": [{ "href": "https://your-site.com/wp-json/wc/v3/shipping/zones" }],
    "describedby": [{ "href": "https://your-site.com/wp-json/wc/v3/shipping/zones/5/locations" }]
  }
}
```