# Delete Responses (RTBF) - Typeform

This connector allows you to delete responses from your Typeform forms that contain specific email addresses, implementing the "Right To Be Forgotten" (RTBF) functionality.

## ⚠️ Important Note
This endpoint is marked as deprecated by Typeform and is no longer officially supported. Consider using a custom script instead as recommended by Typeform.

## Configuration

### Email Addresses
Enter the list of email addresses you want to remove from your form responses. Enter one email address per line.

Example:
```
john.doe@example.com
jane.smith@example.com
contact@company.com
```

### Account ID
Enter your Typeform account ID. This is typically found in your Typeform account settings or developer section.

### Output Variable
Enter a name for the variable that will store the job IDs returned by the API. These job IDs can be used to track the deletion process.

## How It Works

When you run this connector:
1. It sends the list of email addresses to Typeform's RTBF API
2. Typeform will search for and delete responses containing these emails
3. The API returns job IDs that represent the deletion processes
4. These job IDs are stored in your specified output variable

## Response Matching

Typeform will delete responses that contain any of the following:
- A long or short text field containing an email from your list (substring match)
- An email field, hidden field, or text variable exactly matching an email from your list

All matches are case-insensitive.