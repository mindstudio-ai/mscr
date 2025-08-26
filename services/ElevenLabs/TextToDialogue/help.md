# Text to Dialogue

This connector converts multiple text inputs with different voices into a single dialogue audio file using ElevenLabs' Text to Dialogue API.

## Configuration

### Dialogue Inputs
Enter an array of dialogue entries in JSON format. Each entry must have a `text` field and a `voiceId` field.

**Example:**
```json
[
  {
    "text": "Hello there, how are you today?",
    "voiceId": "EXAVITQu4vr4xnSDxMaL"
  },
  {
    "text": "I'm doing well, thank you for asking!",
    "voiceId": "21m00Tcm4TlvDq8ikWAM"
  }
]
```

You can find voice IDs in the ElevenLabs dashboard or by using their Voice Library API.

### Model ID
Select the model to use for text-to-speech conversion:
- **Eleven v3** - Default model with high quality
- **Eleven Turbo v2** - Faster processing with good quality
- **Eleven Multilingual v2** - Supports multiple languages

### Output Format
Choose the format and quality of the output audio file. Higher bitrates provide better audio quality but result in larger files.

## Voice Settings

### Stability
Controls how stable and consistent the voice sounds:
- Lower values (0.1-0.3): More emotional range and variation
- Higher values (0.7-0.9): More monotonous, less variation
- Default is around 0.5 if left empty

### Use Speaker Boost
Enhances the similarity to the original voice sample:
- **Yes**: Better voice matching but may increase processing time
- **No**: Standard voice quality with normal processing time

## Output
Specify a variable name to store the URL of the generated audio file. You can use this variable in subsequent steps of your workflow.