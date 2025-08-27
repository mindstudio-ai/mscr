# Retrieve Contact Score Values

This action retrieves the score values for a specific contact in ActiveCampaign.

## Configuration

### Contact ID
Enter the numeric ID of the contact whose score values you want to retrieve. This is the unique identifier for the contact in your ActiveCampaign account.

Example: `123`

### Output Variable
Specify a name for the variable that will store the retrieved score values. You can reference this variable in subsequent actions in your workflow.

## Output Format

The output will be an array of score value objects with the following structure:

```json
{
  "scoreValues": [
    {
      "score": "2",
      "contact": "1",
      "deal": null,
      "cdate": "2018-03-08T14:01:16-06:00",
      "mdate": "2018-10-22T20:15:28-05:00",
      "scoreValue": "0",
      "id": "1",
      "links": {
        "score": "https://account.api-us1.com/api/3/scoreValues/1/score",
        "contact": "https://account.api-us1.com/api/3/scoreValues/1/contact",
        "deal": "https://account.api-us1.com/api/3/scoreValues/1/deal"
      }
    }
  ]
}
```

## Notes

- You must have a valid ActiveCampaign API key configured in your connection settings.
- If the contact ID doesn't exist, the action will return an error.