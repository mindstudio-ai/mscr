# Remove Saved Albums

This connector removes one or more albums from your Spotify library (the albums you've saved).

## Configuration

### Album IDs
Enter the Spotify album IDs you want to remove from your library. You can specify multiple IDs by separating them with commas.

**Example:**
```
4iV5W9uYEdYUVa79Axb7Rh,1301WleyT98MSxVHPZCA6M,382ObEPsp2rxGrnsizN5TX
```

**Important notes:**
- You can remove up to 20 album IDs in a single request
- You need to use the Spotify album ID, which is a unique identifier for each album
- You can find an album's ID in the Spotify app by right-clicking an album and selecting "Share" → "Copy Spotify URI" (the ID is the string after "album:")

## Authentication

This connector requires authentication with Spotify. Make sure you have connected your Spotify account with the appropriate permissions (specifically the `user-library-modify` scope).