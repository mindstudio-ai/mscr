# Text to Dialogue

This connector converts a series of text inputs with associated voice IDs into a dialogue audio file using ElevenLabs' Text to Dialogue API.

## Configuration

### Dialogue Inputs
Enter your dialogue as a JSON array where each object represents a line of dialogue. Each object must include:
- `text`: The text to be spoken
- `voiceId`: The ID of the voice that will speak this line

Example format:
```json
[
  {
    "text": "Knock knock",
    "voiceId": "JBFqnCBsd6RMkjVDRZzb"
  },
  {
    "text": "Who's there?",
    "voiceId": "Aw4FAjKCGjjNkVhN1Xmq"
  }
]
```

You can find voice IDs in your ElevenLabs account under the Voices section.

### Model
Select the AI model to use for speech generation:
- **Eleven v3**: The default and latest model
- **Eleven Multilingual v2**: Supports multiple languages

### Output Format
Choose the audio format and quality for the generated dialogue:
- **MP3 (44.1kHz, 128kbps)**: Standard quality, good for most uses
- **MP3 (44.1kHz, 64kbps)**: Lower quality but smaller file size
- **MP3 (44.1kHz, 192kbps)**: Higher quality (requires Creator tier or above)
- **PCM (44.1kHz)**: Uncompressed audio (requires Pro tier or above)

## Advanced Settings

### Voice Stability
Controls the consistency and randomness of the voice. Values range from 0 to 1:
- Lower values (e.g., 0.3): More emotional range and variation
- Higher values (e.g., 0.8): More consistent and monotonous

### Use Speaker Boost
Enhances the similarity to the original voice:
- **Yes**: Improves voice similarity but may increase processing time
- **No**: Standard voice processing

## Output
The connector will return a URL to the generated audio file, which will be stored in the variable you specify.
