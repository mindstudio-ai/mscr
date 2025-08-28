# Get Continents

This connector retrieves a list of all continents with their associated countries and states from your WooCommerce store.

## Prerequisites

Before using this connector, make sure you have:

1. A WooCommerce store set up and running
2. API access credentials (Consumer Key and Consumer Secret) with appropriate permissions
3. Configured the WooCommerce service in MindStudio with:
   - Your store URL (e.g., `https://example.com`)
   - Your Consumer Key (starts with `ck_`)
   - Your Consumer Secret (starts with `cs_`)

## Configuration

**Output Variable**: Enter a name for the variable that will store the continents data. This variable will contain an array of continent objects with their countries and states.

## Output Format

The output will be an array of continent objects with this structure:

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
      }
    ]
  }
]
```

## Usage Examples

You can use this data to:
- Create dropdown menus for shipping locations
- Filter products or content by geographic region
- Implement location-based features in your application