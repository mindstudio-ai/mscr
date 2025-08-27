# List Contact Stages

This action retrieves all contact stages from your Apollo account. Contact stages represent the different phases in your sales pipeline, such as "New", "Approaching", "Replied", etc.

## When to use this action

Use this action when you need to:
- Get a list of all contact stages in your Apollo account
- Retrieve the IDs of contact stages for use in other Apollo actions
- Display the available contact stages to users in your workflow

## Configuration

### Output Variable
Enter a name for the variable that will store the list of contact stages. This variable will contain an array of contact stage objects with properties like:

```json
[
  {
    "id": "6095a710bd01d100a506d4ae",
    "team_id": "6095a710bd01d100a506d4ac",
    "display_name": "New",
    "name": "New",
    "display_order": 0,
    "category": "in_progress",
    "is_meeting_set": null
  },
  ...
]
```

## Example Usage

After running this action, you can use the output variable in subsequent steps of your workflow:

- Loop through the stages to display them in a UI
- Find a specific stage by name to get its ID
- Use the stage IDs when updating contacts via other Apollo actions