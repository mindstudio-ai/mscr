# Analyze Visual Content with EyePop.ai

This connector allows you to analyze images and videos using EyePop.ai's visual intelligence platform. The service processes your visual content through specialized endpoints called "Pops" that can detect people, objects, and other visual elements.

## Prerequisites

- An EyePop.ai account with API access
- A valid API key from EyePop.ai
- A created "Pop" endpoint in your EyePop.ai account

## Configuration

### Content Settings

1. **Content URL**: Enter the full URL to the image or video you want to analyze.
   - Example: `https://example.com/images/sample.jpg` or `https://example.com/videos/sample.mp4`
   - Make sure the URL is publicly accessible

2. **Content Type**: Select the type of content you're analyzing:
   - **Image**: For analyzing a single image
   - **Video**: For analyzing a video file

3. **Pop ID**: Enter the ID of your EyePop endpoint (Pop).
   - You can find your Pop IDs in your EyePop.ai dashboard
   - Example: `my-object-detection-pop`

### Output Settings

**Output Variable**: Enter a name for the variable that will store the analysis results. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns the complete analysis results from EyePop.ai, which may include:
- Detected objects with bounding boxes
- People identification
- Scene analysis
- Custom detections based on your Pop configuration

The exact structure of the output depends on the type of Pop you're using.

## Example Use Cases

- Analyze product images for e-commerce platforms
- Detect people and objects in security footage
- Process visual content for content moderation
- Extract visual data for business intelligence