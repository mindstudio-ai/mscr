# Spotify Get New Releases

This action retrieves a list of new album releases featured in Spotify, similar to what you would see in a Spotify player's "Browse" tab.

## Configuration

### Request Parameters

- **Limit**: The maximum number of items to return. Default is 20. You can set any value between 1 and 50.
  
  Example: `20`

- **Offset**: The index of the first item to return. Default is 0. Use with limit to get the next set of items.
  
  Example: To get the second page of results with a limit of 20, set offset to `20`

### Output

- **Output Variable**: The name of the variable where the results will be stored. This variable will contain the full response from Spotify, including album details like name, images, artists, and more.

## Response Structure

The output will contain an `albums` object with:

```json
{
  "albums": {
    "href": "https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20",
    "limit": 20,
    "next": "https://api.spotify.com/v1/browse/new-releases?offset=20&limit=20",
    "offset": 0,
    "previous": null,
    "total": 100,
    "items": [
      {
        "album_type": "album",
        "total_tracks": 12,
        "available_markets": ["US", "CA", ...],
        "external_urls": {
          "spotify": "https://open.spotify.com/album/..."
        },
        "href": "https://api.spotify.com/v1/albums/...",
        "id": "...",
        "images": [
          {
            "url": "https://i.scdn.co/image/...",
            "height": 640,
            "width": 640
          },
          // More images with different sizes
        ],
        "name": "Album Name",
        "release_date": "2023-06-09",
        "release_date_precision": "day",
        "type": "album",
        "uri": "spotify:album:...",
        "artists": [
          {
            "external_urls": {
              "spotify": "https://open.spotify.com/artist/..."
            },
            "href": "https://api.spotify.com/v1/artists/...",
            "id": "...",
            "name": "Artist Name",
            "type": "artist",
            "uri": "spotify:artist:..."
          }
        ]
      }
      // More album items
    ]
  }
}
```

## Authentication

This action requires valid Spotify OAuth credentials. 