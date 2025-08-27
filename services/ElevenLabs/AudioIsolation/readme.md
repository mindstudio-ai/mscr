# Audio Isolation

This connector uses ElevenLabs' Audio Isolation API to remove background noise from audio files and isolate vocals/speech.

## Configuration

### Audio Input

- **Audio File URL**: Enter the URL of the audio file you want to process. The connector will download this file and send it to the ElevenLabs API for processing.
  - Example: `https://example.com/audio.mp3`

- **File Format**: Select the format of your input audio:
  - **Standard audio format**: Use this for common formats like MP3, WAV, etc.
  - **PCM**: Use this if your audio is in 16-bit PCM format at 16kHz sample rate, mono, little-endian. This option may result in lower latency.

### Output

- **Output Variable**: Enter a name for the variable that will store the URL to the processed audio file. You can use this variable in subsequent steps of your workflow.

## Requirements

- An ElevenLabs API key must be configured in the service settings.
- The audio file must be accessible via the provided URL.

## Example Use Cases

- Cleaning up voice recordings for transcription
- Isolating vocals from music for analysis
- Preparing audio for text-to-speech training
- Removing background noise from podcast recordings

## Limitations

- Very large audio files may take longer to process
- The quality of isolation depends on the original audio quality
