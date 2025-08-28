# Delete List Member Note

This action deletes a specific note for a specific list member in MailChimp.

## Configuration

### List Information
- **List ID**: Enter the unique identifier for your MailChimp list. You can find this in your MailChimp account under the Audience settings.

### Member Information
- **Subscriber Email or ID**: Enter either the email address of the list member or their contact ID. The system will automatically convert email addresses to the required MD5 hash format.

### Note Information
- **Note ID**: Enter the ID of the note you want to delete. You can find note IDs by first viewing the notes for a subscriber.

## Example Usage

This action is useful when you need to remove outdated or incorrect notes from a subscriber's record. For example, you might use this action when:

- A customer issue has been resolved and the note is no longer relevant
- Information in a note has become outdated
- You're cleaning up subscriber records

## Tips

- This action permanently deletes the note and cannot be undone
- Make sure you have the correct Note ID before proceeding
- If you're not sure about the Note ID, you can use the "Get List Member Notes" action first to view all notes for a subscriber