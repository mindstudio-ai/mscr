# Search News Articles

This connector allows you to search for news articles related to companies in the Apollo database.

## Usage

### Organization IDs (Required)
Enter one or more Apollo organization IDs as a comma-separated list. These are the companies you want to find news about.

Example:
```
5e66b6381e05b4008c8331b8,5e66b6381e05b4008c8331b9
```

To find organization IDs, you can use Apollo's Organization Search endpoint or locate them in the Apollo web interface.

### News Categories (Optional)
Filter your search to specific categories of news by entering a comma-separated list of categories.

Common categories include:
- `hires` (new employee announcements)
- `investment` (funding news)
- `contract` (new business deals)
- `product` (product launches)

Example:
```
hires,investment
```

### Date Range (Optional)
Narrow your search to a specific time period using the date fields:

- **Published After**: Enter a start date in YYYY-MM-DD format (e.g., `2023-01-01`)
- **Published Before**: Enter an end date in YYYY-MM-DD format (e.g., `2023-12-31`)

### Pagination
Control how many results you receive:

- **Results Per Page**: Number of articles to return per page (default: 25, maximum: 100)
- **Page Number**: Which page of results to retrieve (default: 1)

### Output Variable
The name of the variable where the search results will be stored. This variable will contain an object with:

- `pagination`: Information about total results and pages
- `news_articles`: Array of news articles with details like title, URL, and publication date

## Note
This endpoint consumes credits as part of your Apollo pricing plan and is not accessible to users on free plans.