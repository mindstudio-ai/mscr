# Get Transcript from Fireflies.ai

This connector allows you to retrieve a transcript from Fireflies.ai using its ID.

## Configuration

### Transcript ID
Enter the unique identifier for the transcript you want to retrieve. You can find transcript IDs in your Fireflies.ai dashboard or from previous API calls.

Example: `abc123def456`

### Fields to Include
Choose how much detail you want in the response:

- **Basic**: Returns essential information including title, ID, date, duration, and URLs
- **Standard**: Returns basic information plus speakers, sentences, and a summary
- **Complete**: Returns all available information about the transcript

### Output Variable
Specify a variable name to store the transcript data. You can reference this variable in subsequent steps of your workflow.

## Example Usage

1. Configure the connector with a transcript ID and select the desired level of detail
2. Use the output variable in subsequent steps to access transcript data
3. Access specific fields from the response using dot notation, for example: `{{outputs.transcriptData.title}}`

## Notes

- You must have a valid Fireflies.ai API key configured in your account settings
- If the transcript ID doesn't exist, the connector will return an error