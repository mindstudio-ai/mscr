# Web Search - MrScraper

This connector searches Google with MrScraper and saves the results. By default it returns parsed results, including the organic results with their rank, title, link and description.

## What You'll Need

- A MrScraper API key, configured in the MrScraper service settings. You can create one at [app.mrscraper.com/api-tokens](https://app.mrscraper.com/api-tokens).

## Configuration

### Search

- **Query**: The search terms, for example `best web scraping tools`.
- **Region** (optional): A two-letter country code for the results (Google's `gl` parameter), such as `us`, `gb` or `id`.
- **Language** (optional): An interface language code (Google's `hl` parameter), such as `en`, `de` or `id`.
- **Page**: The results page to return, starting at 1.

### Advanced (optional)

- **Result Format**: **Parsed results (JSON)** (default) returns structured data. **Results page HTML** returns the raw Google results page.
- **Render JavaScript**: Render JavaScript features on the results page. This is slower and rarely needed.

### Output

- **Output Variable**: Stores the search results. With parsed results, the organic results are in the `organic` list (shortened example):

```json
{
  "general": {
    "query": "web scraping",
    "results_cnt": 10,
    "language": "en",
    "location": "us"
  },
  "organic": [
    {
      "rank": 1,
      "global_rank": 1,
      "title": "Example result",
      "link": "https://example.com/",
      "display_link": "https://example.com › guide",
      "source": "Example",
      "description": "A short description of the page.",
      "icon": "data:image/png;base64,..."
    }
  ],
  "pagination": {
    "current_page": 1,
    "next_page": 2
  }
}
```

The results can also include other sections, such as `people_also_ask`, `navigation` and `sponsored`. With **Results page HTML**, the variable contains the HTML of the results page as text.

## Usage Tips

- Pass the results to a Generate Text block to pick the most relevant links, or loop over the `organic` list.
- Combine with the MrScraper Fetch Page connector to read the pages you find.
- Searches can take a while to complete; allow for this in time-sensitive workflows.

## Troubleshooting

- **Authentication failed**: Check the API key in the MrScraper service settings.
- **No organic results**: Try a broader query, or remove the region and language settings.
