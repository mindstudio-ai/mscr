# Get Routing Form

This connector retrieves detailed information about a specific Calendly routing form. Routing forms are questionnaires that help direct invitees to the appropriate scheduling page based on their responses.

## Configuration

### Routing Form UUID

Enter the UUID of the routing form you want to retrieve. This is the unique identifier for the form.

The UUID is the last part of the routing form URL. For example, if your routing form URL is:
```
https://calendly.com/routing_forms/1234abcd-1234-abcd-1234-1234abcd1234
```
Then the UUID would be:
```
1234abcd-1234-abcd-1234-1234abcd1234
```

### Output Variable

Specify a name for the variable that will store the routing form details. This variable will contain all information about the routing form including:

- Name
- Status
- Created/updated timestamps
- Questions and their options
- Routing logic
- Other metadata

## Example Response

The output will be a JSON object similar to:

```json
{
  "resource": {
    "uri": "https://api.calendly.com/routing_forms/1234abcd-1234-abcd-1234-1234abcd1234",
    "name": "Customer Intake Form",
    "status": "active",
    "organization": "https://api.calendly.com/organizations/ABCDEFG",
    "created_at": "2023-01-01T12:00:00.000000Z",
    "updated_at": "2023-01-15T14:30:00.000000Z",
    "questions": [
      {
        "name": "What service are you interested in?",
        "type": "multi",
        "options": [
          {"value": "consulting", "label": "Consulting"},
          {"value": "training", "label": "Training"},
          {"value": "support", "label": "Technical Support"}
        ]
      }
    ]
  }
}
```

## Authentication

This connector uses your Calendly OAuth connection, which is automatically managed by MindStudio.