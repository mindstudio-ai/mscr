# Delete Responses - Typeform

This connector allows you to delete specific responses from a Typeform form.

## What You'll Need

- Your Typeform form ID
- A list of response IDs you want to delete

## Configuration

### Form ID

Enter the unique identifier for your Typeform form. You can find this in your form URL:
- For example, in `https://mysite.typeform.com/to/u6nXL7`, the form ID is `u6nXL7`

### Response IDs

Enter a comma-separated list of response IDs that you want to delete. You can include up to 1000 IDs.

Example:
```
resp_123abc,resp_456def,resp_789ghi
```

### Result Variable

Specify a variable name to store the result of the deletion operation. This will contain information about whether the deletion request was successfully registered.

## Important Notes

- Deletion is not immediate. A successful response only indicates that the request has been registered.
- You may want to verify that responses were actually deleted by using the "Retrieve Responses" endpoint or checking your Typeform dashboard.
- Response IDs that don't exist will be ignored by Typeform.

## Example Usage

1. Get your form ID from your Typeform dashboard
2. Collect the response IDs you want to delete
3. Configure the connector with these values
4. Run the connector to delete the specified responses
5. Check the output variable to confirm the deletion request was registered