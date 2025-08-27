# Retrieve Pipeline

This action retrieves a pipeline and its associated deal stages from ActiveCampaign.

## Configuration

### Pipeline ID
Enter the ID of the pipeline you want to retrieve. This is a numeric identifier for the pipeline in ActiveCampaign.

Example: `4`

### Output Variable
Specify a variable name to store the retrieved pipeline data. This variable will contain the complete pipeline information including all its stages.

## Output

The output will contain a JSON object with the pipeline details and its associated deal stages, including:

- Pipeline information (ID, title, currency, creation date, etc.)
- All deal stages associated with the pipeline (ID, title, color, order, etc.)

Example output:
```json
{
  "dealGroup": {
    "id": "4",
    "title": "Qualifications",
    "currency": "eur",
    "stages": ["9", "10", "11"],
    // other pipeline properties
  },
  "dealStages": [
    {
      "id": "9",
      "title": "To Contact",
      "color": "18D499",
      "order": "1",
      // other stage properties
    },
    // other stages
  ]
}
```

## Notes

- You must have valid ActiveCampaign API credentials configured in your environment.
- The pipeline ID must exist in your ActiveCampaign account.