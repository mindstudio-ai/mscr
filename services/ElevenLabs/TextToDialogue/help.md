# Text to Dialogue

This action converts a list of text and voice ID pairs into speech (dialogue) and returns an audio file.

## Configuration

### Dialogue Inputs
Enter your dialogue inputs in JSON format. Each input should include:
- `text`: The text to be spoken
- `voiceId`: The ID of the voice to use for this line

Example format:
```json
[
  {
    "text": "Hello there!",
    "voiceId": "EXAVITQu4vr4xnSDxMaL"
  },
  {
    "text": "Hi, how are you?",
    "voiceId": "21m00Tcm4TlvDq8ikWAM"
  }
]
```

### Model ID
Select the AI model to use for generating speech:
- **Eleven V3**: Default model with good quality and performance
- **Eleven Turbo V2.5**: Faster generation with slightly lower quality
- **Eleven Multilingual V2**: Better support for multiple languages

### Output Format
Choose the format for your audio file:
- **MP3 (44.1kHz, 128kbps)**: Standard quality, good for most uses
- **MP3 (44.1kHz, 192kbps)**: Higher quality audio (requires Creator tier or above)
- **PCM (44.1kHz)**: Uncompressed audio (requires Pro tier or above)

### Output Variable
The name of the variable where the URL of the generated audio file will be stored.

## Notes
- You'll need an ElevenLabs API key configured in your service settings
- Voice IDs can be found in your ElevenLabs dashboard
- The maximum number of dialogue inputs is limited by your ElevenLabs subscription
