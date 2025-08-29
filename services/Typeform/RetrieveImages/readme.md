# Retrieve Images from Typeform

This action retrieves a list of all images in your Typeform account. The images are returned in reverse-chronological order (newest first).

## What this action does

When you run this action, it will:

1. Connect to your Typeform account using your authorized connection
2. Retrieve all images stored in your account
3. Return an array of image objects with details like file name, ID, and source URL

## Configuration

### Output Variable

Enter a name for the variable that will store the list of images. This variable will contain an array of image objects that you can use in subsequent actions.

## Output Format

The output will be an array of image objects with this structure:

```json
[
  {
    "file_name": "my_image.jpg",
    "id": "abc123",
    "src": "https://images.typeform.com/images/abc123"
  },
  {
    "file_name": "logo.png",
    "id": "def456",
    "src": "https://images.typeform.com/images/def456"
  }
]
```

## Common Use Cases

- Retrieve all images to display in a gallery
- Check if a specific image exists in your account
- Get image URLs to use in other parts of your workflow

## Troubleshooting

If you encounter issues:
- Verify your Typeform connection is properly authenticated
- Check that you have images in your Typeform account
- If you receive an error about rate limits, try again after a short delay