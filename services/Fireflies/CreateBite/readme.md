# Create Bite - Fireflies.ai

This connector creates a "bite" (a clip or segment) from a Fireflies.ai meeting transcript. Bites allow you to extract and share specific portions of your meeting recordings.

## Configuration

### Required Fields

- **Transcript ID**: The unique identifier of the transcript from which you want to create a bite. You can find this ID in the URL when viewing a transcript in Fireflies.ai or through the Fireflies API.

- **Start Time (seconds)**: The point in the recording where your bite should begin, measured in seconds. For example, to start at the 2-minute mark, enter `120`.

- **End Time (seconds)**: The point in the recording where your bite should end, measured in seconds. For example, to end at the 3-minute mark, enter `180`.

- **Output Variable**: The name of the variable where the response data will be stored. This will include the bite ID, status, and other information returned by the API.

### Optional Fields

- **Bite Name**: A custom name for your bite (maximum 256 characters).

### Advanced Options

- **Media Type**: Specify whether the bite should be a video or audio clip.

- **Privacy Settings**: Control who can access the bite:
  - Team Members: Only people in your Fireflies organization
  - Participants: Only people who attended the meeting
  - Public: Anyone with the link

- **Summary**: A brief description or summary of what's contained in the bite (maximum 500 characters).

## Example Use Cases

- Extract key moments from customer calls for training purposes
- Share important decisions from team meetings
- Create clips of product demos or explanations
- Compile meeting highlights for stakeholders who couldn't attend

## Notes

- The start and end times must be within the duration of the original recording
- Creating a bite does not modify the original transcript
- Processing may take a few moments to complete