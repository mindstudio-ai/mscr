# Delete Video

This action allows you to delete a video from Blotato by providing its ID.

## Configuration

### Video ID
Enter the unique identifier of the video you want to delete. You can find this ID in the URL when viewing the video or from the response when you created the video.

Example: `vid_12345abcde`

### Output Variable
The name of the variable where the result of the deletion operation will be stored. The output will contain the ID of the deleted video and a success message.

## Response

When successful, the action returns:

```json
{
  "success": true,
  "message": "Video successfully deleted",
  "id": "vid_12345abcde"
}
```

## Error Handling

If the deletion fails, the action will throw an error with details about what went wrong. Common errors include:
- Invalid video ID
- Video not found
- Server errors

## Note

This action permanently deletes the video and cannot be undone. Make sure you have the correct video ID before proceeding.
