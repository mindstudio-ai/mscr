# List Countries

This connector retrieves a complete list of countries and their states from your WooCommerce store.

## What it does

When executed, this connector will:
1. Connect to your WooCommerce store using your API credentials
2. Retrieve the full list of countries and their states
3. Save the results to your specified output variable

## Configuration

### Output Variable Name
Enter a name for the variable that will store the list of countries. You can reference this variable in subsequent steps of your workflow.

## Output Format

The output will be an array of country objects with this structure:

```json
[
  {
    "code": "US",
    "name": "United States (US)",
    "states": [
      { "code": "AL", "name": "Alabama" },
      { "code": "AK", "name": "Alaska" }
      // Additional states...
    ]
  },
  // Additional countries...
]
```

## Common Use Cases

- Populating country/state dropdown menus in forms
- Validating user-entered location data
- Creating location-based logic in your workflows

## Requirements

This connector requires that you have configured your WooCommerce API credentials in the service settings.