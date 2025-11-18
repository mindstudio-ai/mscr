# Reset Shared Secret

Resets the shared secret for the specified webhook. For more information about how a shared secret is used, see Authenticating Callbacks.
This operation can be used to rotate an API client's webhooks' shared secrets at periodic intervals to provide additional security.

## Inputs

- **webhookId** (required): (Required) The Id of a Webhook
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
