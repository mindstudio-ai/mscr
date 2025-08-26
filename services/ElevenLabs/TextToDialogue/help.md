# Text to Dialogue - Quick Help

## Overview
This connector converts a list of text and voice ID pairs into a conversation (dialogue) using ElevenLabs' text-to-speech API and returns a single audio file containing the entire conversation.

## Configuration

### Dialogue Inputs
Enter your dialogue as a JSON array where each object represents a line in the conversation:

```json
[
  {
    "text": "Hello there! How can I help you today?",
    "voiceId": "EXAVITQu4vr4xnSDxMaL"
  },
  {
    "text": "I'm looking for information about your services.",
    "voiceId": "21m00Tcm4TlvDq8ikWAM"
  }
]
```

Each dialogue input requires:
- `text`: The text to be spoken
- `voiceId`: The ID of the voice to use (from ElevenLabs)

### Model ID
Select the AI model to use for generating speech:
- **Eleven V3 (Default)**: General-purpose model with good quality and performance
- **Eleven Turbo V2.5**: Faster generation with slightly lower quality
- **Eleven Multilingual V2**: Supports multiple languages

### Output Format
Choose the format for your audio file:
- **MP3 (44.1kHz, 128kbps)**: Standard quality, smaller file size
- **MP3 (44.1kHz, 192kbps)**: Higher quality audio (requires Creator tier or above)
- **PCM (44.1kHz)**: Uncompressed audio for highest quality (requires Pro tier or above)

### Output Variable
Enter a name for the variable that will store the URL to the generated audio file.

## Tips
- Find voice IDs in your ElevenLabs dashboard or use the Voice Library
- Keep dialogue lines concise for better results
- Test with fewer dialogue lines before creating longer conversations
- Add pauses in text using commas and periods for more natural-sounding speech

## Example Use Cases
- Create interactive stories with multiple characters
- Generate podcast-like conversations
- Build demo conversations for chatbots or virtual assistants
- Create educational content with multiple speakers
