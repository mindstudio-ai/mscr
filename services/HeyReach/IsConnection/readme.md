# Check Connection Status

This action checks if a LinkedIn lead is a connection to a specific sender account in HeyReach.

## Configuration

### Sender Account ID
Enter the numeric ID of the sender account for which you want to check the connection status. This is a required field.

Example: `123456`

### Lead Profile URL
Enter the full LinkedIn profile URL of the lead you want to check. 

Example: `https://www.linkedin.com/in/johndoe/`

**Note:** You must provide either a Lead Profile URL OR a Lead LinkedIn ID, but not both.

### Lead LinkedIn ID
As an alternative to the profile URL, you can provide the LinkedIn ID of the lead.

Example: `abc123xyz`

**Note:** You must provide either a Lead Profile URL OR a Lead LinkedIn ID, but not both.

### Output Variable
Specify a variable name to store the result of the connection check. The variable will contain a boolean value:
- `true` if the lead is a connection to the sender
- `false` if the lead is not a connection to the sender

## How It Works

This action makes a request to the HeyReach API to determine if a specific LinkedIn lead is connected to a sender account. The result is stored in your specified output variable, which you can use in subsequent steps of your workflow.