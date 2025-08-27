# ElevenLabs Text-to-Speech

This connector converts text to speech using ElevenLabs' AI voices.

## Configuration

### Text
Enter the text you want to convert to speech. You can use markdown formatting for longer texts with paragraphs, emphasis, etc.

### Voice ID
Enter the ID of the voice you want to use. You can find voice IDs by:
1. Going to your ElevenLabs dashboard
2. Selecting a voice
3. Looking at the URL - the voice ID is the string after `/voice-lab/`

**Default Voice**: The default voice ID (`EXAVITQu4vr4xnSDxMaL`) is "Rachel," a popular ElevenLabs voice.

### Model ID
Select the model to use for speech generation:

- **Eleven Multilingual v2**: Supports 29+ languages with natural-sounding speech
- **Eleven Turbo v2.5**: Fastest model with high quality and natural-sounding speech (recommended)

### Output Variable
The name of the variable where the URL to the generated audio will be stored.

## Example Usage
After running this connector, you can use the output variable in other actions, such as:
- Playing the audio in a response
- Sending the audio file to users
- Storing the audio for later use

## Requirements
This connector requires an ElevenLabs API key to be configured in the service settings.
