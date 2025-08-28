# Update an Account in Apollo

This connector allows you to update an existing account in Apollo with new information.

## Required Information

- **Account ID**: The unique Apollo ID for the account you want to update. You can find this by using Apollo's Search for Accounts endpoint.
  - Example: `66e9abf95ac32901b20d1a0d`

## Optional Fields

You can update any of the following account properties:

- **Account Name**: The new name for the account
  - Example: `The Fast Irish Copywriters`

- **Domain**: The domain name for the account (do not include www)
  - Example: `apollo.io`

- **Owner ID**: The ID of the user who should own this account
  - Example: `66302798d03b9601c7934ebf`
  - You can find user IDs using the "Get a List of Users" endpoint in Apollo

- **Account Stage ID**: The ID of the account stage to assign this account to
  - Example: `61b8e913e0f4d2012e3af74e`
  - You can find stage IDs using the "List Account Stages" endpoint in Apollo

- **Address**: The corporate location for the account
  - Example: `Belfield, Dublin 4, Ireland`

- **Phone**: The primary phone number for the account
  - Example: `555-303-1234`

## Output

The connector will return the complete updated account object from Apollo, including all account properties and metadata.

## Note

This endpoint requires a master API key. If you receive a 403 error, please ensure your Apollo API key has sufficient permissions.