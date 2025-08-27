# Get Automation Journey

This connector retrieves a single automation journey by ID from Beehiiv.

## Prerequisites
- You need a Beehiiv API key configured in your MindStudio environment settings.

## Configuration

### Publication ID
Enter the ID of your Beehiiv publication. This ID starts with `pub_` followed by a UUID.

Example: `pub_00000000-0000-0000-0000-000000000000`

### Automation ID
Enter the ID of the automation. This ID starts with `aut_` followed by a UUID.

Example: `aut_00000000-0000-0000-0000-000000000000`

### Automation Journey ID
Enter the ID of the specific automation journey you want to retrieve. This ID starts with `aj_` followed by a UUID.

Example: `aj_00000000-0000-0000-0000-000000000000`

### Output Variable
Enter a name for the variable that will store the automation journey details. You can reference this variable in subsequent steps of your workflow.

## Output

The connector will return the automation journey details as a JSON object with the following structure:

```json
{
  "id": "aj_00000000-0000-0000-0000-000000000000",
  "automation_id": "aut_00000000-0000-0000-0000-000000000000",
  "status": "initiated",
  "subscription_id": "sub_00000000-0000-0000-0000-000000000000",
  "email": "test@example.com",
  "started_at": 1714857600,
  "completed_at": 1714861200
}
```