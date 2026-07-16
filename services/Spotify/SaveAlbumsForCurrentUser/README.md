 # Save Albums to Library

This action saves one or more albums to your Spotify library (also known as "Your Music").

## Requirements
- A Spotify account connected to MindStudio
- The Spotify connection must have the `user-library-modify` permission scope

## Configuration

### Album IDs
Enter the Spotify album IDs you want to save to your library, separated by commas. You can find an album's ID in its Spotify URL or by using the Spotify Search action.

**Example:**
```
382ObEPsp2rxGrnsizN5TX,1A2GTWGtFfWp7KSQTwWOyo,2noRn2Aes5aoNVsU6iWThc
```

**Maximum:** 20 album IDs per request

### Success Message
Enter a variable name to store the success confirmation message. This variable will be set to a message indicating the albums were successfully saved to your library.

## Tips
- You can get album IDs from Spotify URLs. For example, in `https://open.spotify.com/album/382ObEPsp2rxGrnsizN5TX`, the ID is `382ObEPsp2rxGrnsizN5TX`
- This action will add the albums to your library without removing any existing saved albums
- If you try to save an album that's already in your library, it will not cause an error