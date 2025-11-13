# Upload Media to Blotato

This connector allows you to upload media to Blotato by providing a URL. The uploaded media will be processed and stored, returning a new media URL that can be used when publishing posts.

## Usage

1. Enter the URL of the media you want to upload in the **Media URL** field
2. Specify an **Output Variable** name where the resulting media URL will be stored

## Supported Media Types

You can upload:
- Publicly accessible URLs (e.g., `https://example.com/image.jpg`)
- Base64 encoded image data

## Limitations

- Media uploads are limited to 200MB file size or smaller
- There is a rate limit of 10 requests per minute

## Google Drive Tips

If you're uploading from Google Drive, convert your sharing link to a direct download link:

Original link:
```
https://drive.google.com/file/d/18-UgDEaKG7YR7AewIDd_Qi4QCLCX5Kop/view?usp=drivesdk
```

Use this format instead:
```
https://drive.google.com/uc?export=download&id=18-UgDEaKG7YR7AewIDd_Qi4QCLCX5Kop
```

Note: For large files (100MB+), Google Drive may block access with a "can't scan for viruses" message. Consider using Dropbox, AWS S3, or similar services for large media files.

## Example Output

The connector will return a URL in this format:
```
https://database.blotato.com/d1655c49-0bc4-4dd0-88b2-323ce0069fa4.jpg
```

This URL can be used in other Blotato API operations like publishing posts.