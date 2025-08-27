# Update List Status for Contact

This connector allows you to subscribe or unsubscribe a contact from a list in ActiveCampaign.

## Configuration

### Contact and List Information

- **Contact ID**: Enter the numeric ID of the contact you want to update. You can find contact IDs in your ActiveCampaign account under Contacts.
  
- **List ID**: Enter the numeric ID of the list you want to add or remove the contact from. You can find list IDs in your ActiveCampaign account under Lists.
  
- **Status**: Choose whether to subscribe or unsubscribe the contact from the list:
  - **Subscribe**: Adds the contact to the list
  - **Unsubscribe**: Removes the contact from the list
  
  > ⚠️ **Warning**: If you change a contact's status from unsubscribed to subscribed, you will re-subscribe a contact to a list from which they had manually unsubscribed.
  
- **Source ID** (optional): Defaults to 0. Set to "4" when re-subscribing a contact to a list.

### Output

- **Output Variable**: The name of the variable where the API response will be stored. This response includes contact details and relationship information.

## Example Use Cases

- Add new leads to a specific marketing list
- Remove contacts from a list when they complete a purchase
- Move contacts between different marketing segments based on their behavior

## Troubleshooting

If you encounter errors, check that:
- Your ActiveCampaign API credentials are correctly configured
- The Contact ID and List ID exist in your ActiveCampaign account
- You have permission to modify the specified list