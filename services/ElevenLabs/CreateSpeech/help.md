# ElevenLabs Text to Speech

This connector converts text into speech using ElevenLabs AI voices and returns an audio file URL.

## Configuration

### Text
Enter the text you want to convert to speech. You can use markdown formatting for longer texts or to include formatting:

```markdown
Hello! This is a sample text that will be converted to speech.

You can include multiple paragraphs and even basic formatting.
```

### Voice ID
Enter the ID of the voice you want to use. The default voice ID (`EXAVITQu4vr4xnSDxMaL`) is provided as an example.

To find your own voice IDs:
1. Go to your [ElevenLabs dashboard](https://elevenlabs.io/app/voices)
2. Click on a voice
3. Find the Voice ID in the URL or in the voice details

### Model ID
Select the AI model to use for speech generation:
- **Eleven Multilingual v2**: Supports multiple languages
- **Eleven Turbo v2.5**: Faster generation with high quality output

### Output Variable
Enter a name for the variable that will store the URL of the generated audio file. You can use this variable in subsequent steps of your workflow.

## Example Usage

After configuring this connector, you'll get a URL to the generated audio file that you can:
- Play in an audio player
- Download as an MP3 file
- Pass to other connectors in your workflow

## Requirements

This connector requires an ElevenLabs API key to be configured in the service settings.