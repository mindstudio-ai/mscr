# Add to Live Meeting

This connector adds the Fireflies.ai bot to an ongoing meeting to transcribe and analyze your conversation.

## Configuration

### Meeting Details

- **Meeting Link** (Required): Enter the full URL of your active meeting (e.g., `https://meet.google.com/abc-defg-hij` or `https://zoom.us/j/123456789`)
- **Meeting Title** (Optional): Provide a name for the meeting to help identify the transcription later. If left blank, Fireflies will assign a default title.
- **Meeting Password** (Optional): If your meeting requires a password to join, enter it here.

### Additional Options

- **Duration (minutes)** (Optional): Specify how long the bot should stay in the meeting. Defaults to 60 minutes if not provided. Must be between 15 and 120 minutes.
- **Language** (Optional): Specify the primary language of the meeting using a language code (e.g., `en-US` for English, `es-ES` for Spanish). Defaults to English if not provided.

### Output

- **Success Variable**: Name a variable that will store the success status of the operation (`true` if successful).

## Important Notes

- This action is rate-limited to 3 requests per 20 minutes.
- The Fireflies.ai bot must have permission to join your meeting.
- For best results, ensure all participants speak clearly and one at a time.
- The meeting link must be a valid URL for a supported platform (Google Meet, Zoom, Microsoft Teams, etc.).

## Example Usage

Add Fireflies to a Google Meet:
- Meeting Link: `https://meet.google.com/abc-defg-hij`
- Meeting Title: `Weekly Team Standup`
- Duration: `45`