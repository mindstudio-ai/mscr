# Create a Refund

This action creates a refund for an existing WooCommerce order.

## Configuration

### Order Information
- **Order ID**: Enter the numeric ID of the WooCommerce order you want to refund.

### Refund Details
- **Refund Amount**: Enter the total amount to refund (e.g., "10.00"). This amount will override the sum of individual line item refunds if they don't match.
- **Reason**: Optional description explaining why the refund is being issued.
- **Process Payment Gateway Refund**: Choose whether to attempt processing the refund through the payment gateway used for the original order.
- **Restock Items**: Choose whether to automatically add the refunded items back to your inventory.

### Line Items (Optional)
- **Line Items JSON**: If you want to refund specific line items (rather than the entire order), provide a JSON array with the details. Each item should include the line item ID and refund amount.

Example line items JSON:
```json
[
  {
    "id": 123,
    "refund_total": 10.00,
    "refund_tax": [
      {
        "id": 456,
        "refund_total": 2.00
      }
    ]
  },
  {
    "id": 789,
    "refund_total": 15.00
  }
]
```

### Output
- **Output Variable**: Name of the variable that will store the refund result. The response will include the refund ID, date created, amount, and other details from the WooCommerce API.

## Notes
- You must have WooCommerce REST API credentials configured in your service settings.
- The store URL, consumer key, and consumer secret must be set up in your WooCommerce service configuration.
- Refunds cannot exceed the original order amount.