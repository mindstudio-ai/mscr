# Create Dialogue

This action converts multiple text inputs with different voices into a dialogue audio file using ElevenLabs' Text to Dialogue API.

## How to use

1. **Dialogue Inputs**: Enter your dialogue as a JSON array where each object contains:
   - `text`: The text to be spoken
   - `voiceId`: The ID of the voice to use

   Example:
   ```json
   [
     {"text": "Hello there!", "voiceId": "JBFqnCBsd6RMkjVDRZzb"},
     {"text": "Hi, how are you?", "voiceId": "Aw4FAjKCGjjNkVhN1Xmq"}
   ]
   ```

2. **Model ID**: Select the AI model to use for speech generation.
   - **Eleven V3**: Default model with high quality voice generation
   - **Eleven Multilingual V2**: Better for non-English languages
   - **Eleven Turbo V2.5**: Faster processing with slightly lower quality

3. **Output Format**: Choose the audio format and quality for the generated dialogue.

## Advanced Settings

- **Stability**: Controls the emotional range of the voices (0.0-1.0)
  - Lower values (0.1-0.3): More emotional variation
  - Higher values (0.7-0.9): More monotonous, stable voice
  - Leave empty for default

- **Use Speaker Boost**: Enhances voice similarity to the original speaker samples
  - May increase processing time

## Output

The action will generate an audio file containing the dialogue and return a URL to access it.

## Finding Voice IDs

You can find voice IDs in the ElevenLabs voice library at https://elevenlabs.io/voice-library or in your ElevenLabs account under "Voice Library".

## Tips

- Keep dialogue exchanges natural and conversational
- Test with different stability settings to find the right emotional tone
- For best results, use high-quality voice clones or premium voices
