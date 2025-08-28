# Get Automation

This connector retrieves detailed information about a specific automation from your Beehiiv publication.

## Configuration

### Publication ID
Enter your Beehiiv publication ID, which starts with `pub_`. You can find this in your Beehiiv dashboard under publication settings.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Automation ID
Enter the ID of the specific automation you want to retrieve information about. This ID starts with `aut_`.

Example: `aut_00000000-0000-0000-0000-000000000000`

### Output Variable
Enter a name for the variable that will store the automation details. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns a JSON object containing details about the automation, including:

```json
{
  "id": "aut_00000000-0000-0000-0000-000000000000",
  "status": "running",
  "name": "Custom welcome series",
  "trigger_events": ["api"],
  "description": "Sends 2 days after signing up"
}
```

## Authentication

This connector uses your Beehiiv API key which should be configured in the service settings.