# Find Video

This connector allows you to retrieve the status and details of a video created through Blotato's API. It's particularly useful for checking the status of videos that are being processed or for retrieving the final media URL once processing is complete.

## Configuration

### Video ID
Enter the unique identifier of the video you want to retrieve information about. This is the ID you received when you created the video using Blotato's API.

### Output Variable
Specify a name for the variable that will store the retrieved video details. You can reference this variable in subsequent actions in your workflow.

## Output Format

The connector returns a JSON object with the following structure:

```json
{
  "id": "video-id-123",
  "status": "Complete",
  "createdAt": "2023-06-15T14:30:00Z",
  "mediaUrl": "https://storage.blotato.com/videos/video-id-123.mp4",
  "imageUrls": ["https://storage.blotato.com/images/slide1.jpg", "https://storage.blotato.com/images/slide2.jpg"]
}
```

The `status` field will be one of the following:
- "Queued" - Video is waiting to be processed
- "Processing" - Video is currently being generated
- "Complete" - Video is ready and can be accessed via the mediaUrl
- "Failed" - Video generation failed

Note that `mediaUrl` and `imageUrls` will be null if the video is not ready yet.

## Common Use Cases

- Polling for video completion status in an automated workflow
- Retrieving the final media URL to use in social media posts
- Checking if a video generation has completed before proceeding with additional steps