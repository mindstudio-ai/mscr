# Get Contact Automation Entry Counts

This connector retrieves a list of automations a contact is in and the number of times they've entered each automation from your ActiveCampaign account.

## Prerequisites

- You need an ActiveCampaign account with API access
- Your API Key and Base Account URL must be configured in the connector settings

## Configuration

### Contact Information

- **Contact ID**: Enter the numeric ID of the contact you want to retrieve automation entry counts for. This is a required field.
  - Example: `123`

### Output

- **Output Variable**: Enter a name for the variable that will store the automation entry counts data. This variable will be available for use in subsequent steps of your workflow.

## Output Format

The connector returns an array of automation entry counts with the following structure:

```json
[
  {
    "id": "2",
    "name": "Pages: Lead Delivery",
    "status": "1",
    "hidden": "0",
    "contactEntryCount": "1"
  },
  {
    "id": "4",
    "name": "Lead Scoring",
    "status": "1",
    "hidden": "0",
    "contactEntryCount": "2"
  }
]
```

Each object in the array represents an automation the contact is in, with the following properties:
- `id`: The automation ID
- `name`: The name of the automation
- `status`: The status of the automation (1 = active)
- `hidden`: Whether the automation is hidden (0 = not hidden)
- `contactEntryCount`: The number of times the contact has entered this automation