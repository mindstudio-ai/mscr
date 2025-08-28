# Get Bite - Fireflies.ai

This connector retrieves detailed information about a specific "bite" from Fireflies.ai. A bite is a segment or clip from a meeting transcript.

## Configuration

### Bite ID
Enter the unique identifier of the bite you want to retrieve. This ID is provided by Fireflies.ai and typically looks something like `bite-123456`.

### Fields to Include
Select the level of detail you want in the response:

- **Basic**: Returns only essential information (id, name, status, summary)
- **Standard**: Returns basic information plus transcript details and timestamps
- **Complete**: Returns all available fields including captions, sources, and user details

### Output Variable
Enter a name for the variable that will store the bite information. You can reference this variable in subsequent steps of your workflow.

## Example Response

When using the Basic fields option, the output will look similar to:

```json
{
  "user_id": "user-123",
  "id": "bite-456",
  "name": "Meeting Highlights",
  "status": "completed",
  "summary": "This bite contains key points from the quarterly review meeting."
}
```

When using Standard or Complete options, additional fields will be included in the response.

## Authentication

This connector uses your Fireflies.ai API key for authentication. Make sure you have configured your API key in the Fireflies.ai service settings.