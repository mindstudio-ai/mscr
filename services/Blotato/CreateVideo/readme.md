# Create Video with Blotato

This connector creates AI-generated videos using Blotato's video generation platform.

## How to Use

1. **Choose a Template Type**:
   - **POV Wakeup**: Creates a first-person perspective video
   - **Quote Card Slideshow**: Creates slides with quotes and visuals
   - **Empty/Custom**: For more advanced customization

2. **Enter a Script**:
   - For **POV Wakeup**: Enter a descriptive script like "you wake up as a pharaoh"
   - For **Quote Card Slideshow**: Just enter "1" (the quotes will be defined in the Quote Prompts section)
   - For **Empty/Custom**: Enter a detailed script

3. **Select a Style** that matches the visual aesthetic you want for your video.

4. **Choose Caption Position** to determine where text will appear in the video.

5. **Animation Options**:
   - **Animate First Image**: Enables animation for just the first image
   - **Animate All Images**: Enables animation for all images (overrides the first option)

6. **For Quote Card Slideshows**:
   Enter prompts in the Quote Prompts field, one per line. Each prompt will generate a slide. For example:
   ```
   feel down today - what to do
   inspiring quote about success
   motivational quote for entrepreneurs
   ```

7. **Advanced Options** allow you to select specific AI models for image and video generation.

8. **Output Variable** will store the ID of the created video.

## Notes

- Video creation is limited to 1 request per minute.
- Videos are processed asynchronously - the connector returns a video ID immediately, but the actual video may take time to generate.
- You can view and edit your video at `https://my.blotato.com/videos/<VIDEO_ID>`.
