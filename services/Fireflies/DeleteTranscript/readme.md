# Delete Transcript - Fireflies.ai

This connector allows you to delete a specific transcript from your Fireflies.ai account.

## Prerequisites

- You need a Fireflies.ai API key configured in your MindStudio environment.
- You must have permission to delete transcripts in your Fireflies.ai account.

## Configuration

### Transcript Information

- **Transcript ID**: Enter the unique identifier of the transcript you want to delete. 
  - Example: `ff_transcript_12345abcde`
  - You can find the transcript ID in the URL when viewing a transcript in Fireflies.ai or by using the Fireflies.ai API to list your transcripts.

### Response Options

- **Output Variable**: Choose a name for the variable that will store information about the deleted transcript. This variable will contain details such as:
  - Title
  - Date
  - Duration
  - Organizer email
  - And other transcript metadata

## Error Handling

The connector will return an error if:
- The provided transcript ID doesn't exist
- You don't have permission to delete the transcript
- Your API key is invalid or expired
- The network connection fails

## Example Usage

After configuring this connector, you can use the output variable in subsequent steps of your workflow, such as sending a notification that the transcript was successfully deleted.