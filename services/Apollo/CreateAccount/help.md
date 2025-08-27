# Create Account in Apollo

This action creates a new company account in your Apollo.io database.

## Required Information

- **Account Name**: Enter the human-readable name of the company account (e.g., "Acme Corporation")
- **Domain**: Enter the domain name for the account without the "www" prefix (e.g., "acme.com")
- **Output Variable**: Specify a variable name to store the created account details

## Additional Details (Optional)

- **Owner ID**: The Apollo user ID of the person who will own this account. You can find user IDs using the "Get a List of Users" endpoint in Apollo.
- **Account Stage ID**: The ID of the stage to assign this account to in your sales pipeline. You can find stage IDs using the "List Account Stages" endpoint.
- **Phone**: The primary phone number for the account. Apollo will sanitize the number, so you can enter it in any format (e.g., "555-303-1234" or "+44 7911 123456").
- **Address**: The corporate location for the account, which can include city, state, and country (e.g., "San Francisco, CA, United States").

## Important Notes

- This endpoint requires a **master API key**. Regular API keys will not work.
- Apollo does not apply deduplication when creating accounts via API. If your entry has the same name or domain as an existing account, Apollo will create a new account instead of updating the existing one.
- The created account will be returned in the output variable you specify.