# Get Organization Job Postings

This connector retrieves current job postings for a specific organization from Apollo.io. It's useful for identifying companies that are growing headcount in areas that might be strategically important for your business.

## Usage

1. Enter the **Organization ID** of the company for which you want to find job postings. This is a required field.
   - Example: `5e66b6381e05b4008c8331b8`
   - To find organization IDs, you can use Apollo's Organization Search endpoint

2. Select the number of **Results Per Page** you want to retrieve (default is 10)
   - Higher values will return more results at once, but might affect performance

3. Enter the **Page Number** to retrieve (default is 1)
   - Use this to navigate through multiple pages of results
   - Page 1 contains the first set of results

4. Specify an **Output Variable** name where the job postings data will be stored

## Output Format

The connector returns an array of job postings with the following information for each job:

```json
{
  "job_postings": [
    {
      "id": "66d1d4de8a2af7000192f5ec",
      "title": "IT Support Analyst - L2",
      "url": "https://ca.linkedin.com/jobs/view/it-support-analyst-l2-at-apollo-io-4011156187",
      "city": null,
      "state": null,
      "country": "Canada",
      "last_seen_at": "2024-08-30T14:19:10.200+00:00",
      "posted_at": "2024-08-29T19:19:10.200+00:00"
    },
    // Additional job postings...
  ]
}
```

## Note

This API endpoint consumes credits as part of your Apollo pricing plan and is not accessible to Apollo users on free plans.