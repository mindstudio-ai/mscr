# List Deal Stages

This connector retrieves all existing deal stages from your ActiveCampaign account.

## Prerequisites

- You need an ActiveCampaign account with API access
- You need to have your API Key and Account URL configured in the connector settings

## Configuration

### Title Filter (Optional)
Enter text to filter deal stages by title. This performs a partial match, so entering "qual" would match stages with titles like "Qualification" or "Qualified Lead".

### Pipeline ID (Optional)
Enter a specific pipeline ID to only show stages from that pipeline. You can find the pipeline ID in the ActiveCampaign interface or by using the List Pipelines connector.

Example: `4`

### Order By Title (Optional)
Choose how to order the results by title:
- **None**: Use the default ordering
- **Ascending**: Sort alphabetically (A-Z)
- **Descending**: Sort reverse alphabetically (Z-A)

### Output Variable (Required)
Enter a name for the variable that will store the list of deal stages. This variable will contain an array of deal stage objects that you can use in subsequent steps of your workflow.

## Output Format

The output will be an array of deal stage objects with properties like:

```json
[
  {
    "id": "15",
    "title": "Initial Contact",
    "group": "4", // pipeline ID
    "color": "32B0FC",
    "order": "1",
    "width": "280",
    "dealOrder": "next-action DESC",
    // additional properties...
  },
  // more deal stages...
]
```

## Common Use Cases

- Retrieving all stages in a sales pipeline
- Building a dropdown menu of deal stages
- Creating reports based on deal stages
- Automating deal movement between stages