# Get Order Note

This connector retrieves a specific note from a WooCommerce order.

## Prerequisites

Before using this connector, you need to set up the following environment variables in your MindStudio account:

- **Store URL**: Your WooCommerce store URL (e.g., https://example.com)
- **API Consumer Key**: Your WooCommerce API Consumer Key (starts with `ck_`)
- **API Consumer Secret**: Your WooCommerce API Consumer Secret (starts with `cs_`)

You can create API keys in your WooCommerce admin panel under **WooCommerce** > **Settings** > **Advanced** > **REST API**.

## Configuration

### Order Information

- **Order ID**: Enter the numeric ID of the order containing the note you want to retrieve.
  Example: `723`

- **Note ID**: Enter the numeric ID of the specific note you want to retrieve.
  Example: `281`

### Output Configuration

- **Output Variable**: Enter a name for the variable that will store the retrieved order note data.
  Example: `orderNote`

## Output

The connector will return a JSON object containing the note details:

```json
{
  "id": 281,
  "author": "system",
  "date_created": "2017-03-21T16:46:41",
  "date_created_gmt": "2017-03-21T19:46:41",
  "note": "Order ok!!!",
  "customer_note": false,
  "_links": {
    "self": [{ "href": "https://example.com/wp-json/wc/v3/orders/723/notes/281" }],
    "collection": [{ "href": "https://example.com/wp-json/wc/v3/orders/723/notes" }],
    "up": [{ "href": "https://example.com/wp-json/wc/v3/orders/723" }]
  }
}
```