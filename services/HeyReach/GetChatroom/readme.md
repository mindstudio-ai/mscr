# Get LinkedIn Conversation

This connector retrieves a LinkedIn conversation with its messages from HeyReach.

## Prerequisites

- You need a HeyReach account with API access
- Your HeyReach API key must be configured in the service settings

## Configuration

### Conversation Details

- **Account ID**: Enter the numeric ID of the LinkedIn account in HeyReach. This is the account that has access to the conversation you want to retrieve.
  
- **Conversation ID**: Enter the ID of the specific LinkedIn conversation you want to retrieve. This is typically a string value that uniquely identifies the conversation in LinkedIn.

### Output

- **Output Variable**: Specify a name for the variable that will store the conversation details. This variable will contain all conversation data including messages, participant information, and metadata.

## Response Structure

The connector returns a comprehensive object containing:

- Conversation metadata (ID, read status, timestamps)
- Information about the correspondent (profile details, tags, custom fields)
- Details about the LinkedIn account used to access the conversation
- All messages in the conversation with their content and timestamps

## Example Use Cases

- Retrieve conversation history for customer support
- Access LinkedIn messages for sales follow-up automation
- Monitor specific conversations for important updates