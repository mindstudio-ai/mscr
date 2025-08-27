# Delete Post

This action allows you to delete or archive a post in beehiiv.

## Important Notes
- Posts that have been confirmed (published) will have their status changed to archived
- Posts in draft status will be permanently deleted
- This action cannot be undone

## Configuration

### Publication ID
Enter your beehiiv publication ID. This ID starts with `pub_` followed by a UUID.

Example: `pub_00000000-0000-0000-0000-000000000000`

You can find your publication ID in the URL when viewing your publication settings or by using the beehiiv API to list your publications.

### Post ID
Enter the ID of the post you want to delete or archive. This ID starts with `post_` followed by a UUID.

Example: `post_00000000-0000-0000-0000-000000000000`

You can find post IDs in the URL when editing posts or by using the beehiiv API to list your posts.

### Success Message Variable
Enter a name for the variable that will store the success message after the post is deleted or archived.

## What Happens Next
After successful execution, the specified output variable will contain a confirmation message indicating that the post was either deleted or archived.