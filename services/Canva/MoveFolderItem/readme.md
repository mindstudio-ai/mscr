# Move Folder Item

This action allows you to move an item from one folder to another in Canva.

## Configuration

### Item ID
Enter the ID of the item you want to move. This is a unique identifier for a Canva item such as a design or folder.

Example: `Msd59349ff`

Note: Currently, video assets are not supported for moving.

### Destination Folder ID
Enter the ID of the folder where you want to move the item to.

- To move an item to a specific folder, enter the folder ID (e.g., `FAF2lZtloor`)
- To move an item to the top level of a user's projects, enter `root`

### Success Variable
Enter a name for the variable that will store the result of the operation. This variable will contain a success message when the operation completes successfully.

## Important Notes

- This operation requires a valid Canva access token with the `folder:write` scope
- If an item exists in multiple folders, the API will return an error. In this case, you must use the Canva UI to move the item
- This operation is rate limited to 100 requests per minute per user

## Example Use Cases

- Organizing designs by moving them to appropriate folders
- Cleaning up a user's workspace by moving items to designated folders
- Implementing a folder structure management system