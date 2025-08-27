# List Notes

This connector retrieves a list of all notes from your ActiveCampaign account.

## Configuration

### Output Variable
Enter a name for the variable that will store the list of notes. You'll be able to use this variable in subsequent steps of your workflow.

## Filtering Options

### Limit
Specify the maximum number of notes to return. If left blank, the default limit set by ActiveCampaign will be used.

Example: `100`

### Offset
Specify the number of notes to skip for pagination purposes. This is useful when you want to retrieve notes in batches.

Example: `0` (starts from the first note)

## Example Output

The connector returns an array of note objects with the following structure:

```json
[
  {
    "id": "1",
    "relid": "126",
    "reltype": "Activity",
    "userid": "1",
    "is_draft": "0",
    "cdate": "2022-05-26T08:58:34-05:00",
    "mdate": "2022-05-26T08:58:34-05:00",
    "note": "Oh, hi lisa",
    "owner": {
      "type": "activity",
      "id": "126"
    }
  },
  {
    "id": "2",
    "relid": "6",
    "reltype": "Deal",
    "userid": "1",
    "is_draft": "0",
    "cdate": "2023-08-18T11:09:38-05:00",
    "mdate": "2023-08-18T11:09:40-05:00",
    "note": "Here is a note",
    "owner": {
      "type": "deal",
      "id": "6"
    }
  }
]
```