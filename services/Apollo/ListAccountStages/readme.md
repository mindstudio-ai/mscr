# List Account Stages

This action retrieves all account stages from your Apollo.io account. Account stages represent the different phases in an account's lifecycle (e.g., "Review", "Current Client", "Active Opportunity").

## Requirements

- You must have a **master API key** from Apollo.io configured in your environment variables. Regular API keys will not work with this endpoint.

## Configuration

### Output Variable

Enter a name for the variable where you want to store the retrieved account stages. This variable will contain an array of account stage objects with the following structure:

```json
[
  {
    "id": "6095a710bd01d100a506d4b7",
    "team_id": "6095a710bd01d100a506d4ac",
    "display_name": "Review",
    "name": "Review",
    "display_order": 1,
    "default_exclude_for_leadgen": false,
    "category": null,
    "is_meeting_set": null
  },
  ...
]
```

## Common Use Cases

- Retrieving account stage IDs for use in other Apollo actions
- Building dropdown menus with available account stages
- Mapping account stages to your internal CRM stages

## Troubleshooting

If you receive a 403 error, check that you're using a master API key. To create one, visit the API Keys section in your Apollo account settings.