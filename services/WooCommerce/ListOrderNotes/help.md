# List Order Notes

This connector retrieves all notes for a specific WooCommerce order.

## Configuration

### Order ID
Enter the numeric ID of the WooCommerce order for which you want to retrieve notes. You can find this ID in your WooCommerce admin dashboard under Orders.

Example: `123`

### Note Type
Select the type of notes you want to retrieve:
- **Any**: Retrieves all notes regardless of type
- **Customer**: Retrieves only notes visible to customers
- **Internal**: Retrieves only internal notes (visible to store administrators only)

### Output Variable
Enter a name for the variable that will store the retrieved order notes. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns an array of order note objects. Each note contains:

```json
{
  "id": 281,
  "author": "system",
  "date_created": "2017-03-21T16:46:41",
  "date_created_gmt": "2017-03-21T19:46:41",
  "note": "Order ok!!!",
  "customer_note": false
}
```

You can access individual notes using array indexing, for example: `{{outputs.yourOutputVariable[0].note}}` to get the text of the first note.