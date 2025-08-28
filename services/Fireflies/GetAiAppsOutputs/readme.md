# Get AI Apps Outputs

This connector retrieves AI-generated insights from your Fireflies.ai meeting transcripts.

## What This Connector Does

The connector queries the Fireflies.ai GraphQL API to fetch AI App outputs for your meeting transcripts. These outputs contain AI-generated insights, summaries, and other information processed by Fireflies.ai AI Apps.

## Configuration

### Query Parameters

- **Transcript ID** (optional): Enter a specific transcript/meeting ID to retrieve AI App outputs for just that meeting. Leave blank to retrieve outputs across multiple meetings.

- **App ID** (optional): Enter a specific AI App ID to retrieve outputs for just that app. Leave blank to retrieve outputs from all AI Apps.

- **Output Variable**: The name of the variable where the results will be stored. This variable will contain an array of AI App outputs.

### Pagination Options

- **Skip**: Number of records to skip (for pagination). Default is 0.

- **Limit**: Maximum number of outputs to fetch in a single request. The maximum allowed is 10. Default is 10.

## Example Output

The connector will return data in the following format:

```json
{
  "outputs": [
    {
      "transcript_id": "abc123",
      "user_id": "user456",
      "app_id": "app789",
      "created_at": "2023-06-15T10:30:00Z",
      "title": "Weekly Team Sync",
      "prompt": "Summarize the key points of this meeting",
      "response": "The team discussed the following key points: 1) Project timeline updates..."
    }
  ]
}
```

## Notes

- You must have a valid Fireflies.ai API key configured in your connection settings.
- The maximum number of records you can fetch in a single request is 10.
- For larger datasets, use the pagination options to iterate through the results.