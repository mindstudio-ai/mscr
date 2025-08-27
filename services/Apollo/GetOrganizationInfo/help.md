# Get Organization Info

This connector retrieves complete details about an organization from the Apollo.io database using the organization's Apollo ID.

## Prerequisites

- You need a **master API key** from Apollo.io. This endpoint will not work with a regular API key.
- This feature is not accessible to Apollo users on free plans.

## Configuration

### Organization ID

Enter the Apollo ID for the organization you want to research. This is a unique identifier in the Apollo database.

Example: `5e66b6381e05b4008c8331b8`

To find organization IDs, you can use the Organization Search endpoint in Apollo's API.

### Output Variable

Enter a name for the variable that will store the organization details. You can reference this variable in subsequent steps of your workflow.

## Output

The connector returns comprehensive organization information, including:

- Organization name
- Website URL
- Social media profiles (LinkedIn, Twitter, Facebook)
- Alexa ranking
- Founded year
- Logo URL
- Industry
- Estimated number of employees
- Keywords
- And more

## Error Handling

The connector will return an error if:
- You use a non-master API key (403 Forbidden)
- Your API key is invalid (401 Unauthorized)
- The organization ID is invalid or not found (422 Unprocessable Entity)