# Stop Lead in Campaign

This action stops a lead's progression in a HeyReach campaign. Use this when you want to remove a lead from the active campaign flow.

## Configuration

### Campaign ID
Enter the numeric ID of the campaign from which you want to stop the lead. This is a required field.

Example: `123`

### Lead Member ID
Enter the LinkedIn member ID of the lead you want to stop. You can obtain this ID from the 'linkedin_id' field when using the 'GetLeadsFromCampaign' or 'GetLeadsFromList' methods.

Example: `123123123`

### Lead LinkedIn URL
Enter the full LinkedIn profile URL of the lead you want to stop.

Example: `https://www.linkedin.com/in/john-doe`

### Output Variable
Specify a name for the variable that will store the result of this operation. This variable will contain information about whether the operation was successful.

## How It Works

When executed, this action:
1. Sends a request to the HeyReach API to stop the specified lead in the specified campaign
2. Returns a success message when the lead is successfully stopped
3. Provides error details if the request fails

## Common Issues

- **400 Bad Request**: Check that your Campaign ID, Lead Member ID, and Lead URL are valid
- **401 Unauthorized**: Verify your HeyReach API key is correct
- **404 Not Found**: Ensure the campaign and lead exist in your HeyReach account
- **429 Too Many Requests**: You've exceeded the API rate limits, try again later