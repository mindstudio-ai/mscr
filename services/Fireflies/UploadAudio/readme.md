# Upload Audio to Fireflies.ai

This connector allows you to upload audio or video files to Fireflies.ai for transcription.

## Prerequisites

- A Fireflies.ai paid account (free accounts cannot upload audio files)
- A publicly accessible audio/video file URL
- Your Fireflies.ai API key configured in the connector settings

## Configuration

### Audio Source

- **Audio URL**: Enter a publicly accessible HTTPS URL to your audio or video file. The file must be in one of these formats: mp3, mp4, wav, m4a, or ogg.
  - Example: `https://storage.example.com/recordings/meeting-2023-05-15.mp3`
  - Make sure the URL is directly downloadable and not a preview link

### Meeting Details

- **Meeting Title**: Enter a name for the meeting. This will help you identify the transcription in your Fireflies.ai dashboard.
  - Example: `Weekly Team Sync - May 15, 2023`

- **Language** (optional): Select the primary language spoken in the audio. If left blank, Fireflies.ai will auto-detect the language.

- **Save Video** (optional): Choose whether Fireflies.ai should save the video file (if applicable). Select "Yes" to save the video or "No" to only save the audio and transcript.

### Advanced Options

- **Client Reference ID** (optional): A custom identifier you can use to track this upload in your systems.
  - Example: `meeting-123` or `client-acme-call-2023-05-15`

- **Bypass Size Check** (optional): Set to "Yes" if you're uploading very short audio clips (smaller than 50kb). This bypasses Fireflies.ai's normal minimum file size validation.

- **Attendees JSON** (optional): If you want to associate the meeting with specific attendees (useful for CRM integrations), provide a JSON array of attendees with their details.
  - Example:
    ```json
    [
      {
        "displayName": "John Doe",
        "email": "john@example.com",
        "phoneNumber": "1234567890"
      },
      {
        "displayName": "Jane Smith",
        "email": "jane@example.com",
        "phoneNumber": "0987654321"
      }
    ]
    ```

### Output

- **Output Variable**: Name of the variable that will store the result of the upload operation. This will contain information about whether the upload was successful.

## Limitations

- The audio file must be publicly accessible via HTTPS
- You can use signed URLs with short expiry times for security
- Free plan users cannot upload audio files
- Audio files smaller than 50kb will be rejected unless "Bypass Size Check" is enabled

## Troubleshooting

If you encounter errors:
- Verify your API key is correct
- Ensure your audio URL is publicly accessible and downloadable
- Check that your account is on a paid plan
- For very short audio clips, enable "Bypass Size Check"