# Create Order Note for WooCommerce

This connector allows you to add a new note to a WooCommerce order. Notes can be internal (only visible to store administrators) or customer-facing (visible to the customer and will trigger a notification to them).

## Prerequisites

Before using this connector, ensure you have:
- A WooCommerce store
- API credentials (Consumer Key and Consumer Secret) with appropriate permissions
- The Order ID of the WooCommerce order you want to add a note to

## Configuration

### Order Information
- **Order ID**: Enter the numeric ID of the WooCommerce order you want to add a note to (e.g., "723")

### Note Details
- **Note Content**: Enter the text content of your note. You can use multiple lines for longer notes.
- **Customer Visibility**: Choose whether the note should be visible to the customer:
  - "No - Internal note only" (default): The note will only be visible to store administrators
  - "Yes - Customer can see this note": The note will be visible to the customer and they will receive a notification

### Output
- **Output Variable**: Specify a variable name to store the created note data, which will include details like the note ID, author, creation date, and content

## Example Use Cases

- Add internal notes about order processing status
- Document customer communications related to an order
- Add shipping or delivery information that should be visible to the customer
- Record special handling instructions for the fulfillment team

## Response Data

The connector returns the complete note object containing:
- Note ID
- Author information
- Creation date and time
- Note content
- Visibility settings
- API links