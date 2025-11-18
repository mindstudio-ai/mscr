# Revoke Access Token

Revokes the access token used to make this request. The access token is no longer valid, and subsequent API calls made using the token fail.

## Inputs

- **deleteallforapiclient** (optional): The client Id and user Id is fetched based on the token that is used to make this API call. A value of true deletes all tokens associated to the given client Id and user Id.
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
