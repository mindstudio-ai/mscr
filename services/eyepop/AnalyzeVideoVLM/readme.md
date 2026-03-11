# Analyze Video with VLM

Analyze videos using EyePop.ai's Visual Language Model (VLM). Ask questions about video content, describe what's happening, or classify activities.

## Configuration

### Video URL
A publicly accessible URL to the video you want to analyze.

### Text Prompt
The question or instruction for the VLM. Examples:
- "Describe what is happening in this video"
- "What activities are the people performing?"
- "Classify the type of sport being played"
- "List all objects visible in the video"

### VLM Model
- **Qwen3 Instruct** — Best quality, slower
- **Smol** — Fastest, good for simple tasks

### FPS (Frames Per Second)
How many frames per second to sample. Lower values process faster and cost less. Default: 1.

### Max Frames
Maximum number of frames to analyze. Prevents runaway costs on long videos. Default: 16.

### Image Size
Resolution of each frame sent to the VLM:
- **224** — Fast, lower quality
- **640** — Balanced (default)
- **1024** — Best quality, slower

## Output

The output variable receives a JSON object:

```json
{
  "frames": [
    {
      "timestamp": 0.0,
      "texts": [{ "text": "A person walking...", "confidence": 0.95 }],
      "objects": [...],
      "classes": [...]
    }
  ],
  "description": "Combined text from all frames",
  "summary": {
    "framesAnalyzed": 16,
    "model": "qwen3-instruct",
    "prompt": "Describe what is happening",
    "fps": 1,
    "maxFrames": 16,
    "imageSize": 640
  },
  "runInfo": {
    "total_tokens": 1234,
    "visual_tokens": 800,
    "text_tokens": 200,
    "output_tokens": 234
  }
}
```
