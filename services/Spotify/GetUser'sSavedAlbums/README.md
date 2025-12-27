# Get User's Saved Albums

This connector retrieves a list of albums saved in the current Spotify user's 'Your Music' library.

## Prerequisites

- A Spotify account with saved albums
- A properly configured Spotify OAuth connection with the `user-library-read` scope

## Configuration

### Limit
The maximum number of albums to return. The value must be between 1 and 50. If not specified, the default value is 20.

### Offset
The index of the first album to return. Use with limit to get paginated results. If not specified, the default value is 0 (the first item).

Example: If you want to get the second page of results with 10 items per page, set:
- Limit: 10
- Offset: 10

### Market
An ISO 3166-1 alpha-2 country code to filter content by market availability. If not specified, the user's country (associated with their Spotify account) will be used.

Examples: `US`, `GB`, `DE`, `JP`

### Output Variable
The name of the variable where the results will be stored. The output will contain the full response from the Spotify API, including:

- Pagination information (total, limit, offset, next/previous page URLs)
- An array of saved albums with details like:
  - When the album was added to the library
  - Album information (name, artists, release date, tracks, images, etc.)

## Example Output

The output variable will contain a JSON object similar to this:

```json
{
  "href": "https://api.spotify.com/v1/me/albums?offset=0&limit=20",
  "limit": 20,
  "next": "https://api.spotify.com/v1/me/albums?offset=20&limit=20",
  "offset": 0,
  "previous": null,
  "total": 53,
  "items": [
    {
      "added_at": "2023-04-15T12:34:56Z",
      "album": {
        "album_type": "album",
        "name": "Album Name",
        "artists": [
          {
            "name": "Artist Name",
            "id": "artist_id"
          }
        ],
        "images": [
          {
            "url": "https://i.scdn.co/image/...",
            "height": 640,
            "width": 640
          }
        ],
        "id": "album_id",
        "release_date": "2022-01-01",
        "total_tracks": 12
        // Additional album details...
      }
    }
    // More albums...
  ]
}
```