# Get Album Tracks

This connector retrieves tracks from a specified Spotify album using the Spotify API.

## Configuration

### Album Information

- **Album ID**: Enter the Spotify ID of the album you want to retrieve tracks from.
  - This is a required field.
  - Example: `4aawyAB9vmqN3uQ7FjRGTy` (for the album "Black Holes and Revelations" by Muse)
  - You can find an album ID by right-clicking on an album in Spotify and selecting "Share" > "Copy Spotify URI". The ID is the string after "album:" in the URI.

### Optional Parameters

- **Market**: An ISO 3166-1 alpha-2 country code to filter available tracks by market.
  - Example: `US` for United States, `GB` for United Kingdom, `ES` for Spain
  - If not specified, the user's market (based on the access token) will be used.

- **Limit**: Maximum number of tracks to return.
  - Must be between 1 and 50
  - Default: 20
  - Useful for pagination when an album has many tracks.

- **Offset**: The index of the first track to return.
  - Default: 0 (starts from the beginning)
  - Useful for pagination. For example, to get tracks 21-40, set limit=20 and offset=20.

### Output

- **Output Variable**: Name of the variable where the album tracks data will be stored.
  - The output will contain the full response from the Spotify API, including pagination information and track details.

## Output Format

The connector returns a JSON object with the following structure:

```json
{
  "href": "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks?offset=20&limit=20",
  "offset": 0,
  "previous": null,
  "total": 25,
  "items": [
    {
      "artists": [
        {
          "external_urls": { "spotify": "https://open.spotify.com/artist/12Chz98pHFMPJEknJQMWvI" },
          "href": "https://api.spotify.com/v1/artists/12Chz98pHFMPJEknJQMWvI",
          "id": "12Chz98pHFMPJEknJQMWvI",
          "name": "Muse",
          "type": "artist",
          "uri": "spotify:artist:12Chz98pHFMPJEknJQMWvI"
        }
      ],
      "available_markets": ["US", "GB", "CA", ...],
      "disc_number": 1,
      "duration_ms": 240213,
      "explicit": false,
      "name": "Take a Bow",
      "preview_url": "https://p.scdn.co/mp3-preview/...",
      "track_number": 1,
      "type": "track",
      "uri": "spotify:track:3skn2lauGk7Dx6bVIt5DVj",
      "is_local": false
    },
    // More tracks...
  ]
}
```

## Authentication

You must include valid Spotify OAuth credentials. 