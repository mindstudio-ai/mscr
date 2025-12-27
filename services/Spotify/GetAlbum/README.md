# Get Album - Spotify

This connector retrieves detailed information about a specific album from Spotify's catalog.

## Configuration

### Album Information

- **Album ID**: The unique identifier for the Spotify album you want to retrieve. You can find this ID in the Spotify URL for the album.
  - Example: For the URL `https://open.spotify.com/album/4aawyAB9vmqN3uQ7FjRGTy`, the ID is `4aawyAB9vmqN3uQ7FjRGTy`

- **Market** (optional): An ISO 3166-1 alpha-2 country code to filter content by market availability.
  - Example: `US` for United States, `GB` for United Kingdom, `DE` for Germany
  - If not provided, Spotify will use the country associated with the user's account

### Output

- **Output Variable**: Name of the variable where the album information will be stored for use in subsequent actions.

## Output Data

The connector returns a JSON object containing detailed album information including:

- Basic metadata (name, type, release date)
- Album artwork (in various sizes)
- Artists information
- Track listing
- Copyright information
- External IDs
- Popularity metrics

## Example Response

```json
{
  "album_type": "album",
  "total_tracks": 12,
  "name": "Album Name",
  "release_date": "2023-01-01",
  "images": [
    {
      "url": "https://i.scdn.co/image/ab67616d0000b273...",
      "height": 640,
      "width": 640
    }
  ],
  "artists": [
    {
      "name": "Artist Name",
      "id": "artist_id"
    }
  ],
  "tracks": {
    "items": [
      {
        "name": "Track Name",
        "duration_ms": 180000,
        "track_number": 1
      }
    ]
  }
}
```

## Authentication

This connector requires OAuth credentials such as a Client ID and Client Secret to be configured at the service level.