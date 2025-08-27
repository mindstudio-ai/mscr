# Get Voice - ElevenLabs

This connector retrieves detailed information about a specific voice from the ElevenLabs platform.

## What You'll Need

- An ElevenLabs API key (configured in the ElevenLabs service settings)
- The ID of the voice you want to retrieve information about

## Configuration

### Voice ID

Enter the unique identifier of the voice you want to retrieve information about. You can find voice IDs in the ElevenLabs dashboard or by using the List Voices connector.

Example: `21m00Tcm4TlvDq8ikWAM` (Rachel voice)

### Output Variable

Specify a variable name to store the retrieved voice information. This variable will contain a JSON object with all details about the voice, including:

- Voice name and description
- Voice category and labels (accent, gender, etc.)
- Preview URL
- Available models
- Voice settings
- And more metadata

## Usage Tips

- Use this connector to get detailed information about a voice before using it for text-to-speech conversion
- The returned data includes information about which models support this voice
- You can access specific properties of the returned voice object in subsequent steps using dot notation (e.g., `{{outputs.voiceInfo.name}}`)
