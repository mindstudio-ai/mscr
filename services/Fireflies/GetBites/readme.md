# Get Bites from Fireflies.ai

This connector retrieves a list of "bites" from your Fireflies.ai account. Bites are short clips or segments extracted from meeting recordings.

## Configuration Options

### Query Parameters

- **Mine**: When set to "Yes", fetches bites specific to the owner of the API key. Default is "Yes".

- **Transcript ID** (Optional): Filter bites for a specific transcript. Enter the transcript ID if you want to retrieve bites from a particular meeting transcript.

- **My Team** (Optional): When set to "Yes", fetches bites for the owner's team members.

- **Limit** (Optional): Maximum number of bites to fetch in a single query. The maximum allowed is 50. If not specified, the API's default limit will be used.

- **Skip** (Optional): Number of records to skip. This is useful for pagination when combined with the limit parameter.

### Output

- **Output Variable**: The name of the variable where the retrieved bites will be stored. This variable will contain an array of bite objects with details like ID, name, transcript ID, timestamps, and more.

## Example Response

The output variable will contain an array of bite objects similar to:

```json
[
  {
    "transcript_id": "transcript-123",
    "name": "Bite Name",
    "id": "bite-456",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "preview": "Preview text...",
    "status": "completed",
    "summary": "Summary of the bite",
    "user_id": "user-789",
    "start_time": 120,
    "end_time": 180,
    "summary_status": "completed",
    "media_type": "video",
    "created_at": "2023-05-01T12:00:00Z",
    "captions": [
      {
        "end_time": 125,
        "index": 0,
        "speaker_id": "speaker-1",
        "speaker_name": "John Doe",
        "start_time": 120,
        "text": "This is the transcribed text"
      }
    ],
    "sources": [
      {
        "src": "https://example.com/video.mp4",
        "type": "video/mp4"
      }
    ]
  }
]
```

## Notes

- You need to have a valid Fireflies.ai API key configured for this connector to work.
- The maximum number of bites that can be fetched in a single request is 50.
- For pagination, use the combination of "Limit" and "Skip" parameters.