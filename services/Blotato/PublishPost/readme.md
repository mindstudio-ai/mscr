# Blotato Publish Post

This connector allows you to create and publish posts to various social media platforms using Blotato's API.

## Basic Configuration

1. **Text Content**: Enter the main text content for your post. You can use multiple lines.

2. **Platform**: Select the social media platform where you want to publish your post.

3. **Account ID**: Enter your Blotato account ID for the selected platform. You can find this in your Blotato dashboard.

4. **Media URLs**: If you want to include media in your post, enter the URLs as a comma-separated list. These URLs must be from the blotato.com domain.
   
   Example: `https://example.blotato.com/image1.jpg,https://example.blotato.com/image2.jpg`

## Scheduling Options

1. **Schedule Type**:
   - **Post immediately**: Publish the post right away
   - **Schedule for specific time**: Set a specific time to publish
   - **Use next available slot**: Use Blotato's next available time slot

2. **Scheduled Time**: If you selected "Schedule for specific time", enter the time in ISO 8601 format.
   
   Example: `2023-12-31T12:00:00Z`

## Platform-Specific Settings

Depending on your selected platform, you'll need to fill in different fields:

### Facebook
- **Facebook Page ID**: Required when posting to a Facebook page

### LinkedIn
- **LinkedIn Page ID**: Optional - leave blank to post to your personal profile

### Pinterest
- **Pinterest Board ID**: Required - the ID of the board where you want to pin
- **Pinterest Pin Title**: Optional title for your pin

### TikTok
- **TikTok Privacy Level**: Choose who can see your TikTok post

### YouTube
- **YouTube Video Title**: Required title for your YouTube video
- **YouTube Privacy Status**: Choose whether your video is public, unlisted, or private

## Output

The connector will return the post submission ID from Blotato, which you can use to track the status of your post.