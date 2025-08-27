# Create Sound Effect

This connector generates sound effects from text descriptions using ElevenLabs AI. It turns your descriptive text into realistic sound effects that can be used in videos, games, or other media.

## How to use

1. **Text Description** - Write a detailed description of the sound effect you want to generate. Be specific about the characteristics, mood, and context of the sound.

   Examples:
   - "Spacious braam suitable for high-impact movie trailer moments"
   - "Gentle wind rustling through autumn leaves in a forest"
   - "Futuristic spaceship engine powering up with a deep hum and electronic beeps"
   - "Magical spell being cast with sparkling, ethereal tones"

2. **Duration (seconds)** - Optionally specify how long the sound effect should be (between 0.5 and 30 seconds). Leave empty for ElevenLabs to determine the optimal duration based on your description.

3. **Prompt Influence** - Control how closely the generation follows your text description:
   - Lower values (0.1) allow more creative variation but might stray from your description
   - Higher values (0.9) follow your description more strictly but with less variation
   - Medium (0.3) is recommended for most use cases

4. **Output Format** - Choose the audio quality for your sound effect:
   - MP3 (44.1kHz, 128kbps) - Standard quality, suitable for most uses
   - MP3 (44.1kHz, 64kbps) - Lower quality, smaller file size
   - MP3 (44.1kHz, 192kbps) - Higher quality, larger file size

5. **Output Variable** - Name the variable that will store the URL to your generated sound effect.

## Tips for better results

- Include details about the environment, materials, and emotional qualities of the sound
- Mention specific adjectives like "deep," "sharp," "echoing," or "metallic"
- Reference familiar sounds when possible (e.g., "like thunder but more electronic")
- For complex sounds, break down the different elements you want to hear

## Limitations

- Maximum sound duration is 30 seconds
- Very abstract or vague descriptions may produce unpredictable results
- The API may take longer to process more complex sound descriptions