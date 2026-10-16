# Fetch Page - MrScraper

This connector fetches a web page with the MrScraper Scraper API and saves its content as Markdown or HTML. It can also capture a screenshot. MrScraper handles JavaScript rendering, proxies, geolocation and retries for you.

## What You'll Need

- A MrScraper API key, configured in the MrScraper service settings. You can create one at [app.mrscraper.com/api-tokens](https://app.mrscraper.com/api-tokens).
- The URL of a public page you are allowed to access.

## Configuration

### Page

- **URL**: The full address of the page, for example `https://www.scrapethissite.com/pages/simple/`.
- **Content Format**: **Markdown** (default) is best for reading, summarizing and passing to an AI model. **HTML** keeps the full page markup for parsing.

### Page Loading (optional)

Start with the URL alone and change these only if the result is blocked, incomplete or missing content that loads late.

- **Browser Rendering**: **Automatic** (default) lets MrScraper fall back to a browser when needed. **Always** forces a browser; **Never** disables it.
- **Wait For Selector**: A CSS selector, such as `.product-list`, to wait for before the content is returned. This is a selector, not a duration.
- **Country**: A two-letter country code for the request's location, such as `US`, `GB`, `ID` or `SG`. Defaults to `US`.
- **Real-Device Routing**: Route the request through a real device. Try this when a site blocks normal requests.
- **Visit Home Page First**: Visit the site's home page before the target page.
- **Block Images, CSS and Fonts**: Reduces bandwidth and token usage on text-focused pages.
- **Target Request Headers**: A JSON object of headers to send to the target page, for example `{"Accept-Language": "en-US"}`.

### Limits (optional)

- **Timeout (Seconds)**: Page timeout from 1 to 300 seconds. Defaults to 120.
- **Max Retries**: How many times to retry a failed attempt. Defaults to 3; use 0 to disable retries.
- **Token Cap**: Stop retrying once the request has used this many MrScraper tokens. The first attempt always runs.

### Output

- **Output Variable**: Stores the page content as text (Markdown or HTML).
- **Screenshot Variable** (optional): When set, MrScraper also captures a JPEG screenshot and the file URL is stored here. Screenshots always use browser rendering.
- **Details Variable** (optional): Stores an object with request details:

```json
{
  "url": "https://www.scrapethissite.com/pages/simple/",
  "targetStatusCode": 200,
  "tokenUsage": 1,
  "runtime": 4.2,
  "retryCount": 0,
  "error": null
}
```

`targetStatusCode` is the HTTP status the target page returned. A 4xx or 5xx value usually means the page blocked the request or does not exist.

## Usage Tips

- Pass the Markdown output straight to a Generate Text block to summarize or extract fields from the page.
- To scrape many pages with the same layout, fetch one first, check the result, then reuse the same settings for the rest.
- Use the MrScraper Web Search connector first when you need to find the right URL.
- Token usage depends on runtime and bandwidth. See the [MrScraper documentation](https://docs.mrscraper.com) for details.

## Troubleshooting

- **Authentication failed**: Check the API key in the MrScraper service settings.
- **Missing or incomplete content**: Try **Browser Rendering: Always**, add a **Wait For Selector**, or turn on **Real-Device Routing**. Change one setting at a time.
- **Timeouts**: Increase **Timeout (Seconds)**, or turn on **Block Images, CSS and Fonts**.
