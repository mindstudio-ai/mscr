# Get Several Albums

This connector retrieves Spotify catalog information for multiple albums identified by their Spotify IDs.

## Configuration

### Album IDs
Enter a comma-separated list of Spotify album IDs (maximum 20 IDs). Each album ID is a unique identifier for a Spotify album.

Example:
```
382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc
```

You can find an album's ID in its Spotify URL. For example, in the URL `https://open.spotify.com/album/382ObEPsp2rxGrnsizN5TX`, the ID is `382ObEPsp2rxGrnsizN5TX`.

### Market
Optional. Enter an ISO 3166-1 alpha-2 country code to filter content available in that specific market. 

Examples: `US`, `GB`, `ES`, `JP`

If not specified, the country associated with the user account will be used. If neither market nor user country is provided, some content may be considered unavailable.

### Output Variable
Enter a name for the variable that will store the album data. This variable will contain detailed information about the requested albums including:

- Album type (album, single, compilation)
- Total tracks
- Available markets
- Images (cover art)
- Name
- Release date
- Artists
- Tracks
- And more

## Authentication

This connector requires valid Spotify OAuth access credentials. 