# Reactivate User

Reactivates a user in an organization account. User will regain to access Smartsheet and will have the same roles as when they were deactivated.

**This operation is only available to system administrators of Enterprise organizations.**
**Additionally, if organizations have Enterprise Plan Manager (EPM) enabled, a system administrator of the main plan can provide a userId for a user belonging to a managed plan within the EPM hierarchy.**

**NOTES:**
* Currently unavailable for Smartsheet GOV (aka the Gov environment).
* This operation does not apply to users with an ISP based domain account (outlook.com, gmail.com, hotmail.com, live.com, yahoo.com, aol.com, verizon.net, rocketmail.com, comcast.net, icloud.com, charter.net, web.de, mail.com, email.com, usa.com, duck.com, mail.ru).

## Inputs

- **userId** (required): (Required) User Id
- **outputVariable** (required): Name of the variable to store the response

## Output

The connector stores the Smartsheet API response in the specified output variable.
