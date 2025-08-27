# Voice Changer

This connector transforms audio from one voice to another using ElevenLabs' Voice Changer API, while maintaining the original emotion, timing, and delivery.

## Configuration

### Input Configuration

- **Audio File**: Enter a URL to the audio file you want to transform. The connector will download this file and process it.
  - Example: `https://example.com/audio.mp3`

- **Voice ID**: Enter the ID of the target voice you want to transform your audio into. You can find voice IDs in your ElevenLabs dashboard.
  - Example: `JBFqnCBsd6RMkjVDRZzb` (default)

### Advanced Options

- **Model ID**: Select the model to use for voice conversion:
  - **Eleven Multilingual STS v2** (default): Supports multiple languages
  - **Eleven English STS v2**: Optimized for English

- **Output Format**: Choose the format and quality of the output audio:
  - **MP3 (44.1kHz, 128kbps)** (default): Standard quality
  - **MP3 (44.1kHz, 64kbps)**: Lower quality, smaller file size
  - **MP3 (44.1kHz, 192kbps)**: Higher quality, larger file size
  - **PCM (44.1kHz)**: Uncompressed audio (Pro tier or above required)

- **Remove Background Noise**: Choose whether to remove background noise from the input audio:
  - **No** (default): Keep original audio as is
  - **Yes**: Apply noise removal processing

### Output Configuration

- **Output Variable**: Enter a name for the variable that will store the URL to the generated audio file.
  - Example: `transformedAudio`

## Example Use Cases

- Convert narration to a different voice while keeping the original emotion
- Transform your voice for content creation
- Create voice-overs with consistent voice characteristics
- Prototype voice applications with different voice options

## Requirements

- An ElevenLabs API key configured in your connector service
- A valid audio file accessible via URL
