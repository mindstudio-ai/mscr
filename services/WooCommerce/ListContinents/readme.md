# List Continents

This action retrieves a complete list of continents with their countries and states from your WooCommerce store.

## What This Action Does

- Connects to your WooCommerce store using your API credentials
- Retrieves all continents with their associated countries and states
- Returns the data in a structured format that you can use in your workflow

## Configuration

1. **Output Variable**: Enter a name for the variable that will store the list of continents (e.g., `continents`). You can reference this variable in later steps of your workflow.

## Example Response

The output will be an array of continent objects like this:

```json
[
  {
    "code": "AF",
    "name": "Africa",
    "countries": [
      { 
        "code": "AO", 
        "name": "Angola", 
        "states": [
          { "code": "BGO", "name": "Bengo" }
        ] 
      },
      { 
        "code": "BF", 
        "name": "Burkina Faso", 
        "states": [] 
      }
    ]
  },
  {
    "code": "AS",
    "name": "Asia",
    "countries": [
      // Countries in Asia...
    ]
  }
  // Other continents...
]
```

## Prerequisites

Before using this action, make sure you have:
1. A WooCommerce store URL configured in your connection settings
2. Your WooCommerce API Consumer Key and Consumer Secret added to your connection settings