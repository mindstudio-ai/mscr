# Add Contacts to Sequence

This connector allows you to add one or more contacts to an existing sequence in your Apollo account.

## Prerequisites

- You need an Apollo.io account with API access
- You need to have existing sequences set up in Apollo
- You need to know the IDs of the contacts you want to add
- You need to know the ID of the email account to use for sending emails

## Configuration

### Sequence Information

- **Sequence ID**: Enter the ID of the sequence you want to add contacts to. You can find sequence IDs by calling the Search for Sequences endpoint in Apollo or by looking at the URL when viewing a sequence in the Apollo interface.
  Example: `66e9e215ece19801b219997f`

- **Email Account ID**: Enter the ID of the email account that should be used to send emails to the contacts. You can find email account IDs in the Apollo interface under Settings > Email Accounts.
  Example: `6633baaece5fbd01c791d7ca`

### Contact Information

- **Contact IDs**: Enter a comma-separated list of Apollo contact IDs to add to the sequence. You can find contact IDs by searching for contacts in Apollo or through the Apollo API.
  Example: `66e34b81740c50074e3d1bd4,66e34b81740c50074e3d1bd5`

### Advanced Options

- **Add Contacts Without Email**: Choose whether to add contacts who don't have an email address.
- **Add Contacts With Unverified Email**: Choose whether to add contacts with unverified email addresses.
- **Add Contacts With Recent Job Change**: Choose whether to add contacts who have recently changed jobs.
- **Add Contacts Active In Other Sequences**: Choose whether to add contacts who are already active in other sequences.
- **Add Contacts Finished In Other Sequences**: Choose whether to add contacts who have finished other sequences.
- **User ID** (optional): The ID of the user in your Apollo account who should be recorded as taking this action. If not provided, the action will be attributed to the API key owner.

### Output

- **Output Variable**: Name of the variable that will store the API response. The response will include details about the job created to add the contacts to the sequence.

## Example Response

```json
{
  "entity_progress_job": {
    "id": "string",
    "user_id": "string",
    "job_type": "string",
    "entity_ids": ["string"],
    "params": {
      "progress": 0,
      "batch_size": 0,
      "signals_hash": "string"
    }
  }
}
```