# Check User's Saved Albums

This connector allows you to check if one or more albums are already saved in the current Spotify user's 'Your Music' library.

## Configuration

### Album IDs

Enter a comma-separated list of Spotify album IDs that you want to check. Each album ID is a unique identifier for a Spotify album.

**Example:**
```
382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc
```

**Notes:**
- You can include up to 20 album IDs in a single request
- No spaces between commas
- You can find an album's Spotify ID in the Spotify app by right-clicking on an album and selecting "Share" > "Copy Spotify URI" (the ID is the string after "spotify:album:")

### Output Variable

Specify a variable name to store the results. The connector will return an array of boolean values:
- `true` indicates the album is saved in the user's library
- `false` indicates the album is not saved

The array order corresponds to the order of the album IDs you provided.

**Example output:**
```json
[false, true, true]
```
This means the first album is not saved, while the second and third albums are saved in the user's library.

## Authentication

This connector requires the `user-library-read` OAuth scope to access the user's saved albums. Make sure your Spotify connection has this permission enabled.